//Fire up the node server!

//make .env variables available
require('dotenv').config({ path: 'variables.env' })

//import the create server file
const createServer = require('./createServer');

//import database
const db = require('./db');

const server = createServer();
server.start({
  //make endpoint visitably only by approved urls
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL    
  }    
}, res => {
    console.log(`Up and running on http:/localhost:${res.port}`);
    
})


