import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import User from './User';
import CartItem from './CartItem';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import StoreButton from './styles/StoreButton';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';


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
  <User>{({ data: { me }}) => {
    if (!me) return null;
    return (

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
            <StoreButton>CHECKOUT</StoreButton>
          </footer>
        </CartStyles>  
        )}
      </Query>
        )}
    </Mutation> 
    )
    }}
  </User>
  )

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
