//Express/Node Server
const cookieParser = require('cookie-parser') //Middleware to expose helper functions for working with cookies
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' }) //make .env variables available
const createServer = require('./createServer'); //import the create server file
const db = require('./db'); //import database
const server = createServer(); 

//allows use of any existing express middleware, cookies in this case. Allows access inside a formatted object rather than a string
server.express.use(cookieParser()); 

//custom middleware to decode JWT and get userId on each request
server.express.use((req, res, next) => {
  //get token out of request
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    //add the userId to the request for future requests to access
    req.userId = userId;
  }
  next();
})

//custom middleware to populate the user on each request
server.express.use(async (req, res, next) => {
  //if user is not logged in then skip this
  if (!req.userId) return next();
  //else query the user
  const user = await db.query.user(
    { where: { id: req.userId } }, 
    '{ id, permissions, email, name }'
  );
  req.user = user;
  next();
});

server.start({
  //make endpoint visitably only by approved urls
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL    
  }    
}, res => {
    console.log(`Up and running on http://localhost:${res.port}`);
    
})


