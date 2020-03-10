import React from 'react';
import styled from 'styled-components';
import { Lock } from 'scripts/styles/lock';

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

export const MakeGroups = () => (
  <Container>
    <Lock>
      <h1>Make Groups</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam efficitur
        pretium eros, non porttitor orci dictum ut. Donec cursus dui eu rhoncus
        semper. Cras varius a est id pharetra. Vestibulum scelerisque, enim sed
        placerat congue, sem lacus maximus mi, quis ornare risus risus ut augue.{' '}
      </p>
    </Lock>
  </Container>
);
