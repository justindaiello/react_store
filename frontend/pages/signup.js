import Signup from '../components/Signup';
import Signin from '../components/Signin';
import RequestReset from '../components/RequestReset';
import styled from 'styled-components';


const Columns = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;*/
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto; 
  padding: 2rem;
  display: flex;
  margin: 0 auto;
  form {
    margin-right: 3rem !important;
    @media (max-width: 700px) {
      margin: 0 auto !important;
      margin-bottom: 3rem !important;
    }
  }
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const SignupPage = props => (
  <Columns>
    <Signup />  
    <Signin /> 
    <RequestReset />
  </Columns>
)


export default SignupPage;