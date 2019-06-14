import withApollo from 'next-with-apollo'; //high order component that exposes apollo client via a prop. Need this for next.js serverside rendering
import ApolloClient from 'apollo-boost'; //adds extras for cache, statemanagement etc
import { endpoint } from '../config';

const createClient = ({ headers }) => {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include', //include logged in cookies when user makes a request
        },
        headers,
      });
    },
  });
}

export default withApollo(createClient);
