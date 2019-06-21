import styled from 'styled-components';

const PaginationStyles = styled.div`
  text-align: center;
  display: inline-flex;
  align-items: stretch;
  justify-content: center;
  margin: 2rem 0;
  border: 1px solid black;
  /* border-radius: 10px; */
  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid ${props => props.theme.lightgrey};
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }
  @media (max-width: 700px) {
    width: 90%;
  }
`;

export default PaginationStyles;
