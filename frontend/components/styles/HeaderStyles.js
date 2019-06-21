import styled from 'styled-components';

const Logo = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  margin-left: 2rem;
  position: relative;
  a {
    padding: 0.5rem 1rem;
    color: ${props => props.theme.black};
    text-decoration: none;
  }
  @media (max-width: 1000px) {
    margin: 0;
    text-align: center;
  }
`;

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.green};
    line-height: 1;
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
`;

export { Logo, StyledHeader };