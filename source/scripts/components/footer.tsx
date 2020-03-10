import React from 'react';
import styled from 'styled-components';
import { Lock } from '../styles/lock';
import { Color } from '../variables';

const Container = styled.footer`
  background-color: ${Color.darkBlue};
  padding: 20px 0;
  color: ${Color.white};

  & ${Lock} {
    display: flex;
    align-items: center;
  }

  & a,
  & p {
    font-size: 12px;
    font-weight: 400;
  }

  & a {
    font-size: 13px;
    margin-left: 20px;

    &:first-child {
      margin-left: 0;
    }
  }

  & p {
    margin-top: 10px;
  }

  & img {
    height: 80px;
    margin-left: auto;
  }
`;

const Nav = styled.div`
  & > div {
    display: flex;
    align-items: center;
  }
`;

export const Footer = () => (
  <Container>
    <Lock>
      <Nav>
        <div>
          <a href="/profile">Profile</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
        <p>&copy; 2020 draftpick</p>
      </Nav>

      <img src="/images/logo.png" aria-hidden />
    </Lock>
  </Container>
);
