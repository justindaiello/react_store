import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import RemoveButton from './styles/RemoveButton';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;


class RemoveFromCart extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
  }

  //removes item from cart quickly
  //gets called as soon as we get a response back from the server after a mutation has been performed. cache is from apollo, payload is the info returned from the server
  handleUpdate = (cache, payload) => {
    //read the cache
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    console.log(data);
    //remove item from cart
    const cartItemId = payload.data.removeFromCart.id
    data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId)
    //write it back into the cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data })
    
  }

  render() {
    return (
      // mutation will immediately run the optimistic response to delte the item quicker then run the stuff on the back end to actually delete it
      <Mutation 
      mutation={REMOVE_FROM_CART_MUTATION}
      variables={{ id: this.props.id }}
      update={this.handleUpdate}
      optimisticResponse={{
        __typename: 'Mutation',
        removeFromCart: {
          __typename: 'CartItem',
          id: this.props.id,
        }
      }}
      >
        {(removeFromCart, { loading, error }) => (
          <RemoveButton 
          disabled={loading}
          title="Delete Item"
          onClick={() => {
            removeFromCart().catch(err => alert(err.message));
          }}
          >
          &times;
          </RemoveButton>
        )}
      </Mutation>
    )
  }
}

export default RemoveFromCart;