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
  }
};

module.exports = mutations;
