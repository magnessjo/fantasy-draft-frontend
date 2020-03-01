import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Lock from 'scripts/styles/lock';
import { CTAStyles } from 'scripts/styles/call-to-action';
import { Color } from 'scripts/variables';
import { useSelector } from 'react-redux';
import { RootState, UserType } from 'scripts/types';
import { isValidSession } from 'scripts/lib/session';

const Stage = styled.section`
  position: relative;
  overflow: hidden;
  background-image: url(/images/home/stage-default.jpg);
  background-size: cover;
  background-repeat: no-repeat;

  & > div {
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  & ${Lock} {
    padding-top: 20px;
    padding-bottom: 20px;
    min-height: calc(90vh - 80px);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    text-align: center;

    @media (min-width: 768px) {
      padding: 50px 0;
    }

    & > div {
      position: relative;

      &:before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background-color: black;
        padding: 150vh;
        height: 100px;
        width: 100px;
        background: radial-gradient(
          rgba(255, 255, 255, 1) 0,
          rgba(255, 255, 255, 0.4) 50%,
          rgba(255, 255, 255, 0) 70%
        );

        @media (min-width: 768px) {
          padding: 100vh;
        }
      }

      & > * {
        position: relative;
      }
    }
  }

  & video {
    width: auto;
    height: auto;
    min-width: 100%;
    min-height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  & h1 {
    font-family: 'Playfair Display', serif;
    text-shadow: 1px 1px rgba(255, 255, 255, 0.6);
    font-weight: 700;
    letter-spacing: 10px;
    font-size: 40px;
    font-size: calc(18px + 4vw);
    line-height: 1em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  & h2 {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-size: calc(16px + 0.25vw);
    margin-bottom: 20px;
    letter-spacing: 5px;
    text-transform: capitalize;
  }

  & p {
    font-size: 16px;
    max-width: 450px;
    line-height: 1.3em;
    margin: 0 auto;

    @media (min-width: 768px) {
      font-size: 18px;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

const SignUpButton = styled(Link)`
  ${CTAStyles}
  display: inline-block;
  margin-top: 20px;
  text-transform: uppercase;
  background-color: ${Color.black};
  color: ${Color.white};
  letter-spacing: 2px;

  &:hover {
    background-color: ${Color.hoverBlack};
  }
`;

const LoggedIn = ({ user }: { user: string }) => (
  <div>
    <h1>Hello {user}, </h1>
    <h2>Welcome to best draft game on the internet!</h2>
    <SignUpButton to="/entries">Select your Entries</SignUpButton>
  </div>
);

const LoggedOut = () => (
  <div>
    <h1>Draft Pick</h1>
    <h2>The annual mock draft game</h2>
    <p>
      Compete aganist your friends, family, and other fans for the ultimate
      prize of being right
    </p>
    <SignUpButton to="/register">Signup</SignUpButton>
  </div>
);

const Home = () => {
  const user = useSelector<RootState, UserType>(state => state.userState);

  return (
    <Stage>
      <video
        muted
        playsInline
        autoPlay
        placeholder="/images/home/stage-default.jpg"
      >
        <source src="/videos/hugs.mp4" type="video/mp4" />
      </video>
      <div>
        <Lock>
          {isValidSession() && user ? (
            <LoggedIn user={user.first_name} />
          ) : (
            <LoggedOut />
          )}
        </Lock>
      </div>
    </Stage>
  );
};

export default Home;
