# GoAdventure App
### Tech Stack:
* **Front End:**
   
   -React/Next.js  
   -Apollo Client  
   -Styled Components  
   -React Apollo  
   
* **Back End:**
   
   -Node/Express  
   -GraphQL  
   -Prisma  
   -GraphQL Yoga  
   -PostgreSQL
   
![alt text][screenshot]

[screenshot]: https://i.imgur.com/hb8EMA5.png

GoAdventure is a full stack store that utilizes GraphQL to make powerful flexible relational data models. Users can search for items, add items, edit their personal items and delete their personal items. GoAdventure also inces permissions, JSON Web Token authentication, caching, email and a fully functional shopping cart with credit card checkout.

The frontend of GoAdventure uses React and Next.js for routing and server side rendering, Styled Components for CSS is JS. The frontend also includes React Apollo with Apollo Client for GraphQL queries, mutations and state management.

The backend of Go Adventure is run on a Node/Express server and uses PostgreSQL for its database. Prisma sits on top of the database to serve as the API and GraphQL yoga is used on to of that to perform authentication, permissions checks, sending emails, and setting up the mutation and query resolvers. Testing for this project was done with Jest and Enzyme.

A live version of the site is hosted on heroku an can be found [here](https://goadventure-next-prod.herokuapp.com/).
