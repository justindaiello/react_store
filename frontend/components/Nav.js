import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';
import { log } from 'util';

const Nav = () => (
  <NavStyles>
    <User>
      {({ data: { me } }) => {
        console.log(me)
        if (me) return <p>{me.name}</p>
        return null;
      }}
    </User>
    <Link href="/items">  
      <a>Shop</a>
    </Link>
    <Link href="/sell">  
      <a>Sell</a>
    </Link>
    <Link href="/signup">  
      <a>Sign-up</a>
    </Link>
    <Link href="/orders">  
      <a>Orders</a>
    </Link>
    <Link href="/me">  
      <a>Account</a>
    </Link>
  </NavStyles>
)

export default Nav;
