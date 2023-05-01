import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  gap: 4.8rem;
  padding: 1rem 5rem;
`;

const Logo = styled.h1`
  flex: 1;
  color: #000;
  font-size: 2.4rem;
  text-transform: uppercase;
  font-weight: bold;
`;

const Links = styled.ul`
  display: inline-block;
  list-style: none;
  color: #000;
  font-weight: 500;
  font-size: 2rem;
`;

const NavLink = styled(Link)`
  color: #000;
  text-decoration: none !important;
  transition: all 0.3s;

  &:hover {
    color: #9acced;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <Logo>Crypto</Logo>
      <Links>
        <Link>
          <NavLink to="/">Home</NavLink>
        </Link>
      </Links>
    </Nav>
  );
};

export default Navbar;
