import React from 'react';
import styled from 'styled-components';
import { Stage } from './stage';
import { Rules } from './rules';
import { MakeGroups } from './make-groups';
import { First } from './first';
import { Background } from './background';

const Container = styled.div`
  & > * {
    posiiton: relative;
    background-color: white;
    z-index: 99;
    overflow: hidden;
  }
`;

export const Home = () => {
  return (
    <Container>
      <Stage />
      <Rules />
      <MakeGroups />
      <Background />
      <First />
    </Container>
  );
};
