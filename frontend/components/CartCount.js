import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group'; //for animations
import CartIcon from './styles/CartIconStyles';
import CartAnimation from './styles/CartAnimationStyles';


const CartCount = ({ count }) => (
  <CartAnimation>
    <TransitionGroup>
      <CSSTransition 
        unmountOnExit
        className="count"
        classNames="count"
        key={count}
        timeout={{ enter: 400, exit: 400 }}
      >
        <CartIcon>{count}</CartIcon>
      </CSSTransition>
    </TransitionGroup>
  </CartAnimation>
)

export default CartCount;