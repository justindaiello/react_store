//transform other pages into anchor link on the page. Bind to HTML push state
import Link from 'next/link';

const Home = props => (
  <div>
    <p>Hey!</p>
    <Link href="/sell">
      <a>Sell!</a>
    </Link>
  </div>
)


export default Home;
