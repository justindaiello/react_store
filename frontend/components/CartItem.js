import React from 'react';
import formatMoney from '../lib/formatMoney';
import CartItemStyles from './styles/CartItemStyles';
import PropTypes from 'prop-types';
import RemoveFromCart from './RemoveFromCart';


const CartItem = ({ cartItem }) => (
  <CartItemStyles>
    <img width="100" src={cartItem.item.image} alt={cartItem.item.title} />
    <div className="cart-item-details">
      <h3>{cartItem.item.title}</h3>
      <p>
        {formatMoney(cartItem.item.price * cartItem.quantity)}
        {' - '}
        <em>
          {cartItem.quantity} &times; 
          {formatMoney(cartItem.item.price)}/ea
        </em>
      </p>
    </div>
    <RemoveFromCart id={cartItem.id} />
  </CartItemStyles>
)

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
}

export default CartItem;