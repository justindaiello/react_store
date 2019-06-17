//Express/Node Server
const cookieParser = require('cookie-parser') //Middleware to expose helper functions for working with cookies
require('dotenv').config({ path: 'variables.env' }) //make .env variables available
const createServer = require('./createServer'); //import the create server file
const db = require('./db'); //import database
const server = createServer(); 

//allows use of any existing express middleware, cookies in this case. Allows access inside a formatted object rather than a string
server.express.use(cookieParser()); 

server.start({
  //make endpoint visitably only by approved urls
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL    
  }    
}, res => {
    console.log(`Up and running on http://localhost:${res.port}`);
    
})


