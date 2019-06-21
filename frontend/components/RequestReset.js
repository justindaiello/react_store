import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset( email: $email) {
      message
  }
}
`;

class RequestReset extends Component {

  state = {
    email: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      // refetch queries will re run current_user_query to refresh the page with newly logged in user
      <Mutation
        mutation={REQUEST_RESET_MUTATION}
        variables={this.state}
      >
        {(reset, { error, loading, called }) => {
        return (
          <Form 
            method="post" 
            onSubmit={async e => {
              e.preventDefault();
              await reset();
              this.setState({ email: '' });
            }}
          >

          <fieldset 
            disabled={loading}
            aria-busy={loading}
          >
            <h2>Request Password Reset</h2>
            <Error error={error} />
            {!error && !loading && called && <p>Success! An email has been sent with a reset link.</p>}
            <label htmlFor="email">
              Email
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={this.state.email} 
                onChange={this.handleChange}   
            />
            </label>

            <button type="submit">Request Reset</button>

          </fieldset>
        </Form>)
        }}
      </Mutation>
    )
  }
}

export default RequestReset;