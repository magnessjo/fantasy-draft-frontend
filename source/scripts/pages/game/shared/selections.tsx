import React from 'react';
import styled from 'styled-components';
import { EntryTypes } from '../entries';

const Container = styled.div``;

export const Selections = ({ list }: { list: Array<EntryTypes> }) => (
  <Container>
    <h2>Your Selections</h2>
    {list.map(item => (
      <div>
        <p>{item.id}</p>
        <p>{item.team && item.team}</p>
        <p>{item.player && item.player}</p>
      </div>
    ))}
  </Container>
);
