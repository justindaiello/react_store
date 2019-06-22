import styled from 'styled-components';

const Title = styled.h2`
  text-align: center;
`

const OrderUl = styled.ul`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  margin-bottom: 1rem;
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    padding-left: 0;
  }
`;

export { Title, OrderUl };