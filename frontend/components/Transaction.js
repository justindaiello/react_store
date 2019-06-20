import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';


const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`

const totalItems = (cart) => {
  return cart.reduce((tally, cartItem) =>
    tally + cartItem.quantity, 0);
}

class Transaction extends Component {
  
  handleToken = (res, createOrder) => {
    console.log('On token called');
    console.log(res.id)
    //manually call the mutation once we have the stripe token
    createOrder({
      variables: {
        token: res.id
      }
    }).catch(err => {
      alert(err.message)
    })
  }
  
  render() {
    return (
      <User>
        {({ data: {me} }) => (
          <Mutation 
            mutation={CREATE_ORDER_MUTATION}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          >
            {(createOrder) => (
            <StripeCheckout
              amount={calcTotalPrice(me.cart)}
              name="GoAdventure"
              description={`Order of ${totalItems(me.cart)} items!`}
              stripeKey="pk_test_fdVJQP9WVHMLIHfIq1nramUS00FUDh82M8"
              currency="USD"
              email={me.email}
              token={res => this.handleToken(res, createOrder)}
            >
              {this.props.children}
            </StripeCheckout>
            )}
          </Mutation>
        )}
      </User>
    )
  }
}

export default Transaction;

