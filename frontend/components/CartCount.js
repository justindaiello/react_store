import React from 'react';
import PropTypes from 'prop-types';
import CartIcon from './styles/CartIcon';

const CartCount = ({ count }) => (
  <CartIcon>{count}</CartIcon>
)

export default CartCount;