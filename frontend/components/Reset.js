import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!,
    $password: String!,
    $confirmPassword: String!
  ) {
  resetPassword( 
    resetToken: $resetToken,
    password: $password,
    confirmPassword: $confirmPassword) {
      id 
      email 
      name 
  }
}
`;

class Reset extends Component {

  static propTypes = {
    resetToken: PropTypes.string.isRequired
  }

  state = {
    password: '',
    confirmPassword: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      // refetch queries will re run current_user_query to refresh the page with newly logged in user
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        }}
        refetchQueries={[
              {query: CURRENT_USER_QUERY }
            ]}
      >
        {(reset, { error, loading, called }) => {
        return (
          <Form 
            method="post" 
            onSubmit={async e => {
              e.preventDefault();
              await reset();
              this.setState({ password: '', confirmPassword: '' });
              Router.push({
                pathname: '/',
              })
            }} 
          >

          <fieldset 
            disabled={loading}
            aria-busy={loading}
          >
            <h2>Reset Password</h2>
            <Error error={error} />

            <label htmlFor="password">
              Password
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={this.state.password} 
                onChange={this.handleChange}   
            />
            </label>

            <label htmlFor="confirmPassword">
              Confirm Your Password
              <input 
                type="password" 
                name="confirmPassword" 
                placeholder="Comfirm Password" 
                value={this.state.confirmPassword} 
                onChange={this.handleChange}   
            />
            </label>

            <button type="submit">Reset Password</button>

          </fieldset>
        </Form>)
        }}
      </Mutation>
    )
  }
}

export default Reset;