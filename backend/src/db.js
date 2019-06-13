//connects to remote prisma DB and lets you query it using JS
const { Prisma } = require('prisma-binding');

const db = new Prisma({
    //generate prismagraphql query info
    typeDefs: 'src/generated/prisma.graphql',
    //pull from env file
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    debug: false
});

module.exports = db;