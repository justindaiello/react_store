import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!, 
    $name: String!,
    $password: String!,
) {
  signUp(
    email: $email,
    name: $name,
    password: $password
  ) {
    id 
    email
    name
  }
}
`;

class Signup extends Component {

  state = {
    name: '',
    password: '',
    email: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[
          { query: CURRENT_USER_QUERY }
        ]}
      >
        {(signUp, { error, loading }) => {
        return (
          <Form 
            method="post" 
            onSubmit={async e => {
              e.preventDefault();
              const res = await signUp();
              this.setState({ name: '', email: '', password: ''});
              Router.push({
                pathname: '/',
              })
            }}
          >

          <fieldset 
            disabled={loading}
            aria-busy={loading}
          >
            <h2>Sign up!</h2>
            <Error error={error} />
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

            <label htmlFor="name">
              Name
              <input 
                type="text" 
                name="name" 
                placeholder="Name" 
                value={this.state.name} 
                onChange={this.handleChange} 
            />
            </label>

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

            <button type="submit">Sign Up</button>

          </fieldset>
        </Form>)
        }}
      </Mutation>
    )
  }
}

export default Signup;
