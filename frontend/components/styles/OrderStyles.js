import styled from 'styled-components';

const OrderStyles = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 2rem;
  border: 1px solid ${props => props.theme.lightgrey};
  box-shadow: ${props => props.theme.boxShadow};
  padding: 2rem;
  border-top: 10px solid ${props => props.theme.green};
  & > p {
    display: grid;
    grid-template-columns: 1fr 5fr;
    margin: 0;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
    span {
      padding: 1rem;
      &:first-child {
        font-weight: 900;
        text-align: right;
      }
    }
  }
  .order-item {
    border-bottom: 1px solid ${props => props.theme.offWhite};
    display: grid;
    grid-template-columns: 200px 1fr;
    align-items: center;
    grid-gap: 5rem;
    margin: 0 auto;
    justify-content: center;
    padding-bottom: 2rem;
    img {
      width: 100%;
      object-fit: cover;
    }
    @media (max-width: 700px) {
      grid-template-columns: 100px 1fr;
    }
  }
`;
export default OrderStyles;