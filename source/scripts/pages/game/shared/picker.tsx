import React from 'react';
import styled from 'styled-components';
import { EntryTypes } from '../entries';

const Container = styled.div``;

export const Picker = ({ list }: { list: Array<EntryTypes> }) => (
  <Container>
    <h2>Make your selection</h2>
    <form>
      <select>
        {list.map((item: EntryTypes) => (
          <option>{item.id}</option>
        ))}
      </select>
    </form>
  </Container>
);
