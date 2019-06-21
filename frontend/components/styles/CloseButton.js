import styled from 'styled-components';

const CloseButton = styled.button`
  margin-right: 2rem;
  background: none;
  color: ${props => props.theme.green};
  font-size: 3rem;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 0;
  cursor: pointer;
  &:hover {
    color: red; 
  }
`;

export default CloseButton;