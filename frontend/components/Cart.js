import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import StoreButton from './styles/StoreButton';

// @client lets apollo know not to go to gql api/server for this data b/c its client side
const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

const Cart = () => (
  <Mutation mutation={TOGGLE_CART_MUTATION}>
    {(toggleCart) => (
    <Query query={LOCAL_STATE_QUERY}>
      {({data}) => (
      <CartStyles open={data.cartOpen}>
        <header>
          <CloseButton 
            title="close"
            onClick={toggleCart}
          >
            &times;
          </CloseButton>
          <h3 className="cartHeader">Your Cart</h3>
          <p>You have __ Items in your Cart</p>
        </header>

        <footer>
          <p>$10.00</p>
          <StoreButton>Checkout</StoreButton>
        </footer>
      </CartStyles>  
      )}
    </Query>
      )}
  </Mutation>
  )

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
