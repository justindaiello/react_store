import styled from 'styled-components'

const RemoveButton = styled.button`
  color: ${props => props.theme.green};
  font-size: 3rem;
  background: none;
  border: 0;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

export default RemoveButton;