import Link from 'next/link';
import NProgress from 'nprogress';
import Nav from './Nav';
import Router from 'next/router';
import Cart from './Cart';
import { Logo, StyledHeader } from './styles/HeaderStyles';
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
      {/* <Search /> */}
    </div>
    <Cart />
  </StyledHeader>
)

export default Header;
