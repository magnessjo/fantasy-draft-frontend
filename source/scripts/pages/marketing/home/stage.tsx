import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { isValidSession } from 'scripts/lib/session';
import { Lock } from 'scripts/styles/lock';
import { CTAStyles } from 'scripts/styles/call-to-action';
import {
  LargeSansFont,
  XLargeSerifFont,
  MediumSansFont,
} from 'scripts/styles/fonts';
import { Breakpoints, Color } from 'scripts/variables';
import { RootState, UserType } from 'scripts/types';

const Container = styled.section`
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

    @media (min-width: ${Breakpoints.largeMin}px) {
      padding: 50px 0;
    }

    & > div {
      position: relative;

      @media (min-width: ${Breakpoints.largeMin}px) {
        margin-top: 30px;
      }

      &:before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background-color: black;
        padding: 160vh;
        height: 200px;
        width: 200px;
        background: radial-gradient(
          rgba(255, 255, 255, 1) 0,
          rgba(255, 255, 255, 0.8) 30%,
          rgba(255, 255, 255, 0.3) 60%,
          rgba(255, 255, 255, 0) 90%
        );

        @media (min-width: ${Breakpoints.largeMin}px) {
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

  & p {
    font-size: 16px;
    max-width: 450px;
    line-height: 1.3em;
    margin: 0 auto;
    margin-bottom: 20px;
  }
`;

const SignUpButton = styled(Link)`
  ${CTAStyles}
  margin-top: 0;
  min-width: 240px;
  letter-spacing: 1px;
`;

const Headline = styled.h1`
  ${XLargeSerifFont}
  margin-bottom: 10px;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: ${Color.fontBlue};
`;

const LargeText = styled.h1`
  ${LargeSansFont}
  margin-bottom: 20px;
  text-transform: capitalize;
  max-width: 500px;
  text-align: center;
  line-height: 1.3em;
  font-weight: 700;
  color: ${Color.fontBlue};
`;

const MediumText = styled.h2`
  ${MediumSansFont}
  margin-bottom: 10px;
  text-transform: capitalize;
  font-weight: 700;
  color: ${Color.fontBlue};
`;

const LoggedIn = () => (
  <div>
    <LargeText>Welcome to best draft game on the internet!</LargeText>
    <SignUpButton to="/entries">Create an Entry</SignUpButton>
  </div>
);

const LoggedOut = () => (
  <div>
    <Headline as="h1">Draft Pick</Headline>
    <MediumText>The annual mock draft game</MediumText>
    <p>
      Compete aganist your friends, family, and other fans for the ultimate
      prize of being right
    </p>
    <SignUpButton to="/register">Signup</SignUpButton>
  </div>
);

export const Stage = () => {
  const user = useSelector<RootState, UserType>(state => state.userState);

  return (
    <Container>
      <video
        muted
        playsInline
        autoPlay
        placeholder="/images/home/stage-default.jpg"
      >
        <source src="/videos/hugs.mp4" type="video/mp4" />
      </video>
      <div>
        <Lock>{isValidSession() && user ? <LoggedIn /> : <LoggedOut />}</Lock>
      </div>
    </Container>
  );
};
