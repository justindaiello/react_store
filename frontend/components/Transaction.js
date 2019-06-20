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

const totalItems = (cart) => {
  return cart.reduce((tally, cartItem) =>
    tally + cartItem.quantity, 0);
}

class Transaction extends Component {
  
  handleToken = (res) => {
    console.log('On token called');
    console.log(res.id)
    
  }
  
  render() {
    return (
      <User>
        {({ data: {me} }) => (
          <StripeCheckout
            amount={calcTotalPrice(me.cart)}
            name="GoAdventure"
            description={`Order of ${totalItems(me.cart)} items!`}
            stripeKey="pk_test_fdVJQP9WVHMLIHfIq1nramUS00FUDh82M8"
            currency="USD"
            email={me.email}
            token={res => this.handleToken(res)}
          >
            {this.props.children}
          </StripeCheckout>
        )}
      </User>
    )
  }
}

export default Transaction;

