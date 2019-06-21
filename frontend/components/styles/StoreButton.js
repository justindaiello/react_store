import styled from 'styled-components';

const StoreButton = styled.button`
  display: inline-block;
  color: white;
  background: ${props => props.theme.green};
  font-size: 2rem;
  padding: .8rem 1.5rem;
  transition: all .5s;
  cursor: pointer;
  box-shadow: ${props => props.theme.boxShadow};
  &[disabled] {
    opacity: .5;
  }
  &:hover {
    color: ${props => props.theme.green};
    background: white;
  }
`;

export default StoreButton;