import styled from 'styled-components';

const StoreButton = styled.button`
  display: inline-block;
  color: white;
  background: ${props => props.theme.lightBlue};
  font-size: 2rem;
  padding: .8rem 1.5rem;
  transition: all 0.5s;
  cursor: pointer;
  &[disabled] {
    opacity: .5;
  }
`;

export default StoreButton;