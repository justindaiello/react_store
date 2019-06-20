import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt'; //help deal with the nested render props
import User from './User';
import CartItem from './CartItem';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import StoreButton from './styles/StoreButton';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';
import Transaction from './Transaction';


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

//help with the nested prop types via adopt. arrow funcs and render are a workaround for the proptype errors
const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toggleCart: ({ render }) => <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>,
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>
});

const Cart = () => (
  <Composed>
    {({ user, toggleCart, localState }) => {
      const me = user.data.me;
      if (!me) return null;
      return (
        <CartStyles open={localState.data.cartOpen}>
          <header>
            <CloseButton 
              title="close"
              onClick={toggleCart}
            >
              &times;
            </CloseButton>
            <h3 className="cartHeader">{me.name}'s Cart</h3>
            <p>You Have {me.cart.length} Item
              {me.cart.length === 1 ? '' : 's'} in Your Cart
            </p>
          </header>
          <ul>
            {me.cart.map(cartItem => 
              <CartItem 
                key={cartItem.id} 
                cartItem={cartItem} 
              />
            )}
          </ul>
          <footer>
            <p>{formatMoney(calcTotalPrice(me.cart))}</p>
            <Transaction>
              <StoreButton>CHECKOUT</StoreButton>
            </Transaction>
          </footer>
        </CartStyles> 
      )
    }}
  </Composed>
)

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
