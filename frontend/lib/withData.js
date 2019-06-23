import withApollo from 'next-with-apollo'; //high order component that exposes apollo client via a prop. Need this for next.js serverside rendering
import ApolloClient from 'apollo-boost'; //adds extras for cache, statemanagement etc
import { endpoint, alias } from '../config';
import { LOCAL_STATE_QUERY } from '../components/Cart';

const createClient = ({ headers }) => {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : alias,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include', //include logged in cookies when user makes a request
        },
        headers,
      });
    },
    //local data
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) { //cache destructured from client
            //read the cartOpen value from the cache
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY
            });
            //write the cart state to the opposite
            const data = {
              data: { cartOpen: !cartOpen }
            };
            //put it back in state       
            cache.writeData(data);
            return data;
          },
        },
      },
      defaults: {
        cartOpen: false,
      },
    },
  });
}

export default withApollo(createClient);
