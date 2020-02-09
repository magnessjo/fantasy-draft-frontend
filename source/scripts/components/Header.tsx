import React from 'react';
import styled from 'styled-components';
import Lock from 'scripts/styles/Lock';
import CTA from 'scripts/styles/CallToAction';

const Wrapper = styled.header`
  display: block;
  border-bottom: 1px solid black;
  height: 80px;

  & ${Lock} {
    padding-right: 0;
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
`;

const Header = () => (
  <Wrapper>
    <Lock>
      <div className="header-layout">
        <a href="/">
          <img src="/images/logo.png" aria-hidden />
        </a>

        <nav>
          <a href="">
            <span>Example</span>
          </a>
          <a href="">
            <span>Example</span>
          </a>
          <CTA>
            <span>Login</span>
          </CTA>
        </nav>
      </div>
    </Lock>
  </Wrapper>
);

export default Header;
