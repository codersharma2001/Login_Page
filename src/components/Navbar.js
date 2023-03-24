import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import img from '../pages/Logo.png';
import { auth , provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const LogoContainer = styled.div`
  width: 100px;
  height: 50px;
`;

const LogoImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const Nav = styled.nav`
  background-color: #f4fff4;
  padding: 0.5rem;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
`;

const NavItem = styled.li`
  margin: 0 0.5rem;
`;

const NavLink = styled(Link)`
  color: #438b6e;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    color: #1f614a;
  }
`;

const RightNavItem = styled(NavItem)`
  margin-left: auto;
`;

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);



  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Nav>
      <NavList>
        <NavItem>
          <LogoContainer>
            <LogoImage src={img} alt="Logo" />
          </LogoContainer>
        </NavItem>
        <RightNavItem>
          {user ? (
            <NavLink onClick={handleSignOut}>Sign Out</NavLink>
          ) : (
            <>
              <NavItem>
              <NavLink onClick={handleGoogleSignIn}>Sign In with Google</NavLink>
              </NavItem>

              <NavLink to="/signin" style={{ marginRight: '1rem' }}>Sign In</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
            </>
          )}
        </RightNavItem>
      </NavList>
    </Nav>
  );
};

export default Navbar;
