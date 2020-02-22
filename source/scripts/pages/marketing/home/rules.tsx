import React from 'react';
import styled from 'styled-components';
import Lock from 'scripts/styles/lock';

const Container = styled.section`
  padding: 40px 0;

  & h1 {
    margin-bottom: 30px;
    text-align: center;
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

  @media (min-width: 768px) {
    margin-bottom: 0;
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
        <p>
          <span>1 point</span>
          For picking a player who gets drafted
        </p>
      </Column>
      <Column>
        <p>
          <span>2 points</span>
          For picking a player and the selection
        </p>
      </Column>
      <Column>
        <p>
          <span>3 points</span>
          For picking a player and the team
        </p>
      </Column>
      <Column>
        <p>
          <span>4 points</span>
          For picking a player, the team, and the selection
        </p>
      </Column>
    </Row>
  </Container>
);

export default Rules;
