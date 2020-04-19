import React from 'react';
import styled from 'styled-components';
import { Lock } from 'scripts/styles/lock';
import { SectionHeadline, CenteredSummary } from './styles';
import { Breakpoints } from '../../../variables';

const Container = styled.div`
  padding: 50px 0;
  text-align: center;

  & ${Lock} {
    position: relative;
  }
`;

const Players = styled.div`
  margin: 0 auto;
  z-index: 999;
  display: flex;
  justify-content: space-between;

  @media (min-width: ${Breakpoints.largeMin}px) {
    width: 850px;
  }

  & > div {
    align-self: center;
    position: relative;

    @media (max-width: ${Breakpoints.mediumMax}px) {
      flex-grow: 1;
      display: none;
    }

    &:nth-of-type(2) {
      @media (max-width: ${Breakpoints.mediumMax}px) {
        display: block;
        height: 100vw;
      }
    }
  }
`;

const Player = styled.div<{
  image: string;
  big?: boolean;
}>`
  @media (min-width: ${Breakpoints.largeMin}px) {
    height: ${({ big = false }) => (big ? `450px` : `330px`)};
    width: ${({ big = false }) => (big ? `336px` : `250px`)};
  }

  & > div {
    background-image: url(/images/home/${({ image }) => image}.jpg);
    background-size: cover;

    @media (max-width: ${Breakpoints.mediumMax}px) {
      width: 100%;
      height: 100%;
    }

    @media (min-width: ${Breakpoints.largeMin}px) {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
`;

export const First = () => (
  <Container>
    <Lock>
      <SectionHeadline>Who goes #1</SectionHeadline>
      <CenteredSummary>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam efficitur
        pretium eros, non porttitor orci dictum ut. Donec cursus dui eu rhoncus
        semper. Cras varius a est id pharetra. Vestibulum scelerisque, enim sed
        placerat congue, sem lacus maximus mi, quis ornare risus risus ut augue.{' '}
      </CenteredSummary>
      <Players>
        <div>
          <Player image="young">
            <div></div>
          </Player>
        </div>
        <div>
          <Player image="burrow" big={true}>
            <div></div>
          </Player>
        </div>
        <div>
          <Player image="simmons">
            <div></div>
          </Player>
        </div>
      </Players>
    </Lock>
  </Container>
);
