import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="nav">
      <h1 className="logo">Crypto</h1>
      <ul className="links">
        <li>
          <Link className="navLink" to="/">
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
