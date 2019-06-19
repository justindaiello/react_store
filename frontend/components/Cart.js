import React from 'react';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import StoreButton from './styles/StoreButton'

const Cart = () => (
  <CartStyles open>
    <header>
      <CloseButton title="close">&times;</CloseButton>
      <h3 className="cartHeader">Your Cart</h3>
      <p>You have __ Items in your Cart</p>
    </header>

    <footer>
      <p>$10.00</p>
      <StoreButton>Checkout</StoreButton>
    </footer>
  </CartStyles>  
  )

export default Cart;