import React from 'react';
import styled from 'styled-components';
import { Lock } from 'scripts/styles/lock';
import { SectionHeadline, SectionContainer } from './styles';
import { MediumSansFont } from 'scripts/styles/fonts';
import { Breakpoints, Color } from 'scripts/variables';

const Row = styled.div<{ order?: string }>`
  @media (min-width: ${Breakpoints.largeMin}px) {
    height: 300px;
    display: flex;
    align-items: center;
  }

  &:first-of-type {
    margin-top: 80px;
  }

  & > * {
    width: 50%;
  }

  & img {
  }

  & > div.image {
    background-color: ${Color.lightBlue};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: white;
  }

  & h2 {
    ${MediumSansFont};
    text-align: center;
    margin-bottom: 30px;
    font-weight: 700;
  }

  & p {
    text-align: center;
    line-height: 1.2em;
    margin-bottom: 10px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  & > div {
    max-width: 600px;
    margin: 0 auto;

    @media (min-width: ${Breakpoints.largeMin}px) {
      padding: 0 20px;
    }
  }

  &:nth-of-type(even) {
    & div {
      @media (min-width: ${Breakpoints.largeMin}px) {
        order: 2;
      }
    }

    & div.image {
      @media (min-width: ${Breakpoints.mediumMax}px) {
        order: 1;
      }
    }
  }
`;

export const MakeGroups = () => (
  <SectionContainer>
    <Lock>
      <SectionHeadline>How to Get Started</SectionHeadline>
      <p>
        Summary Text to be added. Coming soon. Summary Text to be added. Coming
        soon. Summary Text to be added. Coming soon.
      </p>
      <Row>
        <div>
          <h2>Create a profile</h2>
          <p>Coming Soon Text</p>
          <p>Coming Soon Text</p>
        </div>
        <div className="image">
          <p>Coming Soon</p>
        </div>
        {/* <img src="/images/placeholder.jpg" alt="" /> */}
      </Row>

      <Row>
        <div>
          <h2>Make your Entries</h2>
          <p>Create multiple entries and multiple groups.</p>
          <p>Coming Soon Text</p>
        </div>
        <div className="image">
          <p>Coming Soon</p>
        </div>
        {/* <img src="/images/placeholder.jpg" alt="" /> */}
      </Row>

      <Row>
        <div>
          <h2>Invite your friends</h2>
          <p>Compete against everyone or just the people you select!</p>
          <p>Invite your friends to join you in a private group.</p>
        </div>
        <div className="image">
          <p>Coming Soon</p>
        </div>
        {/* <img src="/images/placeholder.jpg" alt="" /> */}
      </Row>
    </Lock>
  </SectionContainer>
);
