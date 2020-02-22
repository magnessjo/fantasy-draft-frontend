import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Lock from 'scripts/styles/lock';
import { Color } from 'scripts/variables';

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
      margin-left: 30px;
      height: 100%;
      display: flex;
      align-items: center;
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

const Header = () => (
  <Wrapper>
    <Lock>
      <div className="header-layout">
        <a href="/">
          <img src="/images/logo.png" aria-hidden />
        </a>

        <nav>
          <Link to="/">
            <span>Example</span>
          </Link>
          <Link to="/">
            <span>Example</span>
          </Link>
          <Link to="/" className="login">
            <span>Login</span>
          </Link>
        </nav>
      </div>
    </Lock>
  </Wrapper>
);

export default Header;
