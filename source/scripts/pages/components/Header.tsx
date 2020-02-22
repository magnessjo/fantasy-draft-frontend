import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Lock from 'scripts/styles/lock';
import { Color } from 'scripts/variables';
import { UserType, RootState } from 'scripts/types';
import { useSelector } from 'react-redux';

const Wrapper = styled.header`
  display: block;
  height: 80px;
  position: fixed;
  width: 100%;
  z-index: 9;
  background-color: white;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);

  & ${Lock} {
    padding-right: 0;
    width: 100%;
    max-width: 100%;
  }

  & .header-layout {
    display: flex;
    align-items: center;
    height: 100%;

    & > a {
      height: 80%;
      display: block;
    }
  }

  & nav {
    display: flex;
    margin-left: auto;
    align-items: center;
    height: 100%;

    & > * {
      padding: 0 20px;
      height: 100%;
      display: flex;
      align-items: center;
    }

    & a:hover {
      text-decoration: none;
    }
  }

  & .login {
    font-weight: 700;
    background-color: ${Color.blue};
    padding: 10px 20px;
    letter-spacing: 0.5px;
    color: ${Color.white};
  }
`;

const LoggedIn = () => (
  <nav>
    <Link to="/groups">
      <span>Groups</span>
    </Link>
    <Link to="/entries">
      <span>Entries</span>
    </Link>
    <button>
      <span>Profile</span>
    </button>
  </nav>
);

const LoggedOut = () => (
  <nav>
    <Link to="/login" className="login">
      <span>Login</span>
    </Link>
  </nav>
);

const Header = () => {
  const user = useSelector<RootState, UserType>(state => state.userState);

  console.log(user);

  return (
    <Wrapper>
      <Lock>
        <div className="header-layout">
          <a href="/">
            <img src="/images/logo.png" aria-hidden />
          </a>
          {user ? <LoggedIn /> : <LoggedOut />}
        </div>
      </Lock>
    </Wrapper>
  );
};

export default Header;
