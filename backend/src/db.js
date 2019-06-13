//connect to DB/GraphQL Yoga
const { Prisma } = require('prisma-binding');

const db = new Prisma({
    //generate prismagraphql query info
    typeDef: 'src/generated/prisma.graphql',
    //pull from env file
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    debug: false
});

module.exports = db;