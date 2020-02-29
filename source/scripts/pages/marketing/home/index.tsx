import React from 'react';
import styled from 'styled-components';
import Stage from './stage';
import Rules from './rules';
import MakeGroups from './make-groups';

const Container = styled.div``;

const Home = () => {
  return (
    <Container>
      <Stage />
      <Rules />
      <MakeGroups />
    </Container>
  );
};

export default Home;
