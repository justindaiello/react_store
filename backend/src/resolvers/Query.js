const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils')

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
    hasPermission(context.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
    //if the do, query all users
    return context.db.query.users({}, info);
  },

};


module.exports = Query;
