const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  
  me(parent, args, context, info) {
    //check to see if there's a current userId
    if (!context.request.userId) {
      return null;
    }
    return context.db.query.user({
      where: { id: context.request.userId}
    }, info);
  },

  async users(parent, args, context, info) {
    //check if user is logged in
    if (!context.request.userId) {
      throw new Error('You must be logged in to use this feature.')
    }
    //check if the user has permissions to query all users
    hasPermission(context.request.user, ['USER']);
    //if they do, query all users
    return context.db.query.users({}, info);
  },

  async order(parent, args, context, info) {
    //make sure user is logged in
    if (!context.request.userId) {
      throw new Error('You must be logged in to view this page');
    }
    //query the current order
    const order = await context.db.query.order({
      where: { id: args.id },
    }, info);
    //check if they have permission to see this order
    const ownsOrder = order.user.id === context.request.userId;
    const hasPermissionToSeeOrder = context.request.user.permissions.includes('ADMIN');
    if (!ownsOrder || !hasPermissionToSeeOrder) {
      throw new Error('You do not have permission to view this page.')
    }
    //return the order
    return order;
  },

  async orders(parent, args, context, info) {
    //get the users ID and check for login
    const { userId } = context.request;
    if (!userId) {
      throw new Error('You must be logged in to see this.')
    }
    //return the orders
    return context.db.query.orders({
      where: {
        user: { id: userId }
      }
    }, info);
  },
};


module.exports = Query;
