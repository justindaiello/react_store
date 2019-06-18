const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto'); //built in node module for token security
const { promisify } = require('util');//to turn randonBytes into an async promised based function

//resolvers

const mutations = {

  async createItem(parent, args, context, info) {
    //interface with Prisma DB, get access to methods in prisma.graphql file. returns a promise. need to make it async/await for item to go into item value
    const item = await context.db.mutation.createItem({
      data: {
        ...args
      }
      //make sure item is returned from the DB once its created by passing in info again
    }, info);
    
    return item
  },

  updateItem(parent, args, context, info) {
    //take a copy of the updates
    const updates = { ...args }
    //remove ID from the updates do we dont change it for a later
    delete updates.id;
    //run the update method
    return context.db.mutation.updateItem({
      data: updates,
      where: {
        id: args.id
      }
    }, 
    info //contains the query with item info to be returned
    );
  },

  async deleteItem(parent, args, context, info) {
    const where = { id: args.id };
    //find the item in the DB, pass in some raw gql
    const item = await context.db.query.item({ where }, `{ id title }`);
    //check if user owns item/has permissions
    //delete it
    return context.db.mutation.deleteItem({ where }, info);
  },

  async signUp(parent, args, context, info) {
    //keep email lowercase to avoid errors
    args.email = args.email.toLowerCase();
    //hash password with one way hash via bcrypt, salt length of 10
    const password = await bcrypt.hash(args.password, 10);
    //create the user inside of the DB
    const user = await context.db.mutation.createUser({
      data: {
        ...args,
        password: password,
        permissions: { set: ['USER']},
      }
    }, info);
    //create JWT to auto-sign in the user post registration.
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    //make the jwt a cookie on the response
    context.response.cookie('token', token, {
      // keeps JS from being able to access cookies
      httpOnly: true, 
      maxAge: 1000 * 60 * 60 * 24 * 365 //1 year cookie
    })
  //return the user to the browser
  return user;
  },

  //destructured args into email and password
  async signIn(parent, { email, password }, context, info) {
    //check if there's a user with that email
    const user = await context.db.query.user({ where: { email: email } });
    if (!user) {
      throw new Error(`No user found for email: ${email}`);
    }
    //check if password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error(`Invalid Password.`);
    }
    //if PW is valid, generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    //set the cookie with the token
    context.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    //return the user
    return user;
  },

  signOut(parent, args, context, info) {
    //clear cookies using cookie parser
    context.response.clearCookie('token');
    return { message: 'You are now logged out'};
  },

  async requestReset(parent, args, context, info) {
    //check is this is a real user
    const user = await context.db.query.user({
      where: { email: args.email }
    });
    if (!user) {
      throw new Error(`No user found for email: ${args.email}`);
    }
    //if there is a user then set and generate a temp user token.
    //take a buffer from randombytes and turn it into a string
    const randomBytesPromisified = promisify(randomBytes)
    const resetToken = (await randomBytesPromisified(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000 //1hr 
    //save variables and send them to the user
    const res = await context.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken: resetToken, resetTokenExpiry: resetTokenExpiry }
    });
    return { message: 'resetting PW'};
  },

  async resetPassword(parent, args, context, info) {
    //check if the passwords match
    if (args.password !== args.confirmPassword) {
      throw new Error('Passwords do not match.');
    }
    //Check token to make sure its legitimate and/or expired 
    const [user] = await context.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000
      }
    });
    if (!user) {
      throw new Error('Token invalid or expired.')
    }
    //otherwise, hash the new password
    const password = await bcrypt.hash(args.password, 10);
    //save the new password and remove the old one
    const updatedUser = await context.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password: password, 
        resetToken: null,
        resetTokenExpiry: null
      },
    });
    //generate JWT and set it
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    context.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    // return the new user
    return updatedUser;
  },
};

module.exports = mutations;
