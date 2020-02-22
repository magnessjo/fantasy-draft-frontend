import React from 'react';
import styled from 'styled-components';
import Stage from './stage';
import Rules from './rules';

const Container = styled.div`
  height: 500vh;
`;

const Home = () => {
  return (
    <Container>
      <Stage />
      <Rules />
    </Container>
  );
};

export default Home;
