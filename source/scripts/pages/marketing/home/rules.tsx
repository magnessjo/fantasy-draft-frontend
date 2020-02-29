import React from 'react';
import styled from 'styled-components';
import Lock from 'scripts/styles/lock';

const Container = styled.section`
  padding: 40px 0;

  & h1 {
    margin-bottom: 30px;
    text-align: center;
    font-size: 22px;
    font-size: calc(22px + 2vw);
    text-transform: uppercase;
  }

  & ${Lock} > p {
    max-width: 800px;
    margin: 0 auto;
    margin-bottom: 50px;
    text-align: center;
    font-size: 18px;
    font-size: calc(18px + 0.2vw);
    line-height: 1.3em;
  }
`;

const Row = styled.div`
  @media (min-width: 768px) {
    display: flex;
  }
`;

const Column = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  flex: 1;

  @media (min-width: 768px) {
    margin-bottom: 0;
    border-left: 1px solid black;
  }

  & h2 {
  }

  & span:first-of-type {
    display: block;
    text-align: center;
    font-size: 22px;
    font-size: calc(22px + 5vw);
    font-weight: 700;
    margin-bottom: 12px;
    line-height: 1em;
  }

  & span:last-of-type {
    display: block;
    text-align: center;
    font-size: 16px;
    font-size: calc(16px + 0.5vw);
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  & li {
    text-align: center;
    list-style: none;
  }
`;

const Rules = () => (
  <Container>
    <Lock>
      <h1>The Rules</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam efficitur
        pretium eros, non porttitor orci dictum ut. Donec cursus dui eu rhoncus
        semper. Cras varius a est id pharetra. Vestibulum scelerisque, enim sed
        placerat congue, sem lacus maximus mi, quis ornare risus risus ut augue.{' '}
      </p>
    </Lock>

    <Row>
      <Column>
        <h2>
          <span>1</span>
          <span>point</span>
        </h2>
        <ul>
          <li>player</li>
        </ul>
      </Column>
      <Column>
        <h2>
          <span>2</span>
          <span>points</span>
        </h2>
        <ul>
          <li>player</li>
          <li>selection</li>
        </ul>
      </Column>
      <Column>
        <h2>
          <span>3</span>
          <span>points</span>
        </h2>
        <ul>
          <li>player</li>
          <li>team</li>
        </ul>
      </Column>
      <Column>
        <h2>
          <span>4</span>
          <span>points</span>
        </h2>
        <ul>
          <li>player</li>
          <li>team</li>
          <li>selection</li>
        </ul>
      </Column>
    </Row>
  </Container>
);

export default Rules;
