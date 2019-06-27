import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import styled from 'styled-components';
import Signin from './Signin';

const WarningStyles = styled.p`
  text-align: center;
`;

const PleaseSignIn = (props) => (
  <Query
    query={CURRENT_USER_QUERY}
  >
    {({data, loading}) => {
      if (loading) return <p>Loading...</p>
      if (!data.me) {
        return <div>
          <WarningStyles>You must be signed in to access this page.</WarningStyles>
          <Signin />

        </div>
      }
      return props.children
    }}
  </Query>
)

export default PleaseSignIn;