import styled from 'styled-components';

const CartIcon = styled.div`
  color: white;
  background: ${props => props.theme.green};
  border-radius: 10%;
  padding: .5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem; 
  font-weight: 100;
  /* maintains width in div as numbers change */
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

export default CartIcon