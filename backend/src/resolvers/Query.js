const { forwardTo } = require('prisma-binding');

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
  }
};


module.exports = Query;
