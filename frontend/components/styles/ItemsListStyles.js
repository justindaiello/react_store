import styled from 'styled-components';

const Center = styled.div`
  text-align: center;
  max-width: 1000px;
  margin: 0 auto;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  @media (max-width: 700px) {
    grid-template-columns: 1fr; 
  }
`;

export { Center, ItemsList };