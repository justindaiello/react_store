//Import GraphQL Yoga server
const { GraphQLServer } = require('graphql-yoga');

//Resolvers - where does the data come from and what does it do (query resolver when you pull, mutation resolver when you push)
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');

//Pull in database
const db = require('./db');

//Create GraphQL Yoga Server

const createServer = () => {
    return new GraphQLServer({
      typeDefs: 'src/schema.graphql',
      resolvers: {
        Mutation: Mutation,
        Query: Query  
      },
      //small fix for errors, unsure what its doing
      resolverValidationOptions: {
        requireResolversForResolveType: false    
      },
      //access DB from resolvers for auth
      context: req => ({ ...req, db })
    })
}

module.exports = createServer;




