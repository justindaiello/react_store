import styled from 'styled-components';

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.boxShadow};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  h2 {
    border-bottom: 1px solid ${props => props.theme.green};
  }
  img {
    margin-top: 4rem;
    width: 100%;
    height: 50%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
  button {
    display: inline-block;
    color: white;
    background: ${props => props.theme.green};
    border: 1px solid ${props => props.theme.black};
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
  }
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    width: 90%;
  }
`;

export default SingleItemStyles;