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
  }
};

module.exports = mutations;
