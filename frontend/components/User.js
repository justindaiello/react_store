//CUSTOM RENDER PROP COMPONENT 
// lets us re-use this component without having to write a new query every single time

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id 
      email
      name
      permissions
    }
 }
`;

const User = (props) => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired,
}

export default User;
export { CURRENT_USER_QUERY };