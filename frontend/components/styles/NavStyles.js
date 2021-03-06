import styled from 'styled-components';

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  button {
    background: none;
    border: 0;
  }
  a,
  button {
    color: ${props => props.theme.black};
    padding: 0rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-size: .85em;
    cursor: pointer;
    @media (max-width: 700px) {
      font-size: 14px;
      padding: 5px 10px;
    }
    &:before {
      content: '';
      width: 2px;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      bottom: 0;
    }
    &:after {
      height: 2px;
      background: ${props => props.theme.black};
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2rem;
      @media (max-width: 700px) {
        background: none;
      }
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 60px);
      }
    }
  }
  @media (max-width: 1000px) {
    border-top: 1px solid ${props => props.theme.lightgrey};
    width: 100%;
    justify-content: center;
    font-size: 2rem;
  }
  @media (max-width: 500px) {
    flex-direction: column-reverse;
    align-items: center;
    input {
      margin-bottom: 1rem;
    }
  }
`;

export default NavStyles;
