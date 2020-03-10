import React from 'react';
import styled from 'styled-components';
import { Breakpoints } from 'scripts/variables';

const Container = styled.section`
  height: 250px;
  position: relative;

  @media (min-width: ${Breakpoints.largeMin}px) {
    min-height: 250px;
    max-height: 30vh;
    height: 80vw;
  }

  && {
    z-index: -1;
  }

  & > div {
    position: fixed;
    min-height: 100vh;
    height: 100vh;
    width: 100%;
    background-image: url(/images/home/background.jpg);
    background-size: cover;
    background-position: center;
    display: flex;
    top: 0;
    justify-content: center;
    align-items: center;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 58, 116, 0.9);
    }

    & > div {
      position: relative;
      z-index: 999;
      text-align: center;

      @media (min-width: ${Breakpoints.largeMin}px) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  & span,
  & p {
    color: white;
    font-size: 5vw;
    text-transform: uppercase;
    z-index: 999;
    line-height: 1em;
    display: block;
    font-weight: 700;
  }

  & img {
    max-height: 150px;
    margin: 10px 0;

    @media (min-width: ${Breakpoints.largeMin}px) {
      margin: 0 10px;
    }
  }
`;

export const Background = () => (
  <Container>
    <div>
      <div>
        <p>The Fantasy</p>
        <img src="/images/logo.png" aria-hidden />
        <span>Game!</span>
      </div>
    </div>
  </Container>
);
