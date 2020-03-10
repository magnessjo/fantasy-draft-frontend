import React from 'react';
import styled from 'styled-components';
import { Lock } from 'scripts/styles/lock';
import { Color, Breakpoints } from 'scripts/variables';
import { SectionContainer, SectionHeadline } from './styles';

const Row = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: ${Breakpoints.largeMin}px) {
    display: flex;
    /* flex-wrap: wrap; */
  }
`;

const Column = styled.div`
  padding: 20px;
  position: relative;
  text-align: center;

  @media (max-width: ${Breakpoints.mediumMax}px) {
    border-bottom: 1px solid ${Color.black};
  }

  @media (min-width: ${Breakpoints.largeMin}px) {
    margin-bottom: 0;
    width: 25%;
  }

  &:after {
    @media (min-width: ${Breakpoints.largeMin}px) {
      content: '';
      height: 60%;
      width: 1px;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      background-color: ${Color.black};
      display: block;
    }
  }

  &:first-of-type:after {
    display: none;
  }

  &:last-of-type {
    @media (max-width: ${Breakpoints.mediumMax}px) {
      border-bottom: none;
    }
  }

  & span {
    display: block;
    text-align: center;
    font-size: 22px;
    font-size: calc(22px + 5vw);
    font-weight: 700;
    margin-bottom: 12px;
    line-height: 1em;
  }

  & li {
    text-align: center;
    list-style: none;
    text-transform: capitalize;
    display: inline-block;
    margin-left: 20px;
    position: relative;

    &:first-of-type {
      margin-left: 0;
    }

    &:first-of-type:after {
      display: none;
    }

    &:after {
      content: '+';
      left: -13px;
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
    }
  }
`;

export const Rules = () => (
  <SectionContainer>
    <Lock>
      <SectionHeadline>The Rules</SectionHeadline>
      <p>
        Each entry will accumulate points per selection. The combination of
        player, team, and selection determines the points.
      </p>

      <Row>
        <Column>
          <h2>
            <span>4</span>
          </h2>
          <ul>
            <li>player</li>
            <li>team</li>
            <li>selection</li>
          </ul>
        </Column>
        <Column>
          <h2>
            <span>3</span>
          </h2>
          <ul>
            <li>player</li>
            <li>team</li>
          </ul>
        </Column>
        <Column>
          <h2>
            <span>2</span>
          </h2>
          <ul>
            <li>player</li>
            <li>selection</li>
          </ul>
        </Column>
        <Column>
          <h2>
            <span>1</span>
          </h2>
          <ul>
            <li>player</li>
          </ul>
        </Column>
      </Row>
    </Lock>
  </SectionContainer>
);
