import styled from 'styled-components';

const CartAnimation = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: all .5s;
    backface-visibility: hidden;
  }
  /* initial state */
  .count-enter {
    background: white;
    color: ${props => props.theme.green};
  }
  .count-enter-active {
    
  }
  .count-exit {
    top: 0;
    position: absolute;
   
  }
  .count-exit-active {
   
  }
`;

export default CartAnimation;