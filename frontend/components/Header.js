import Link from 'next/link';
import styled from 'styled-components';
import NProgress from 'nprogress';
import Nav from './Nav';
import Router from 'next/router';
import Cart from './Cart';
import Search from './Search';


//NProgress CSS in static folder. NPRogress will add loading bar based on next.js router input
Router.onRouteChangeStart = () => {
  NProgress.start(); 
}

Router.onRouteChangeComplete = () => {
  NProgress.done();
}

Router.onRouteChangeError = () => {
  NProgress.done();
}

const Logo = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  margin-left: 2rem;
  position: relative;
  a {
    padding: 0.5rem 1rem;
    color: black;
    text-decoration: none;
  }
  @media (max-width: 1000px) {
    margin: 0;
    text-align: center;
  }
`;

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px double ${props => props.theme.lightBlue};
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
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
  }
`;

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a>GoAdventure</a>
        </Link>
      </Logo>
      <Nav />
    </div>
    <div className="sub-bar">
      <Search />
    </div>
    <Cart />
  </StyledHeader>
)

export default Header;
