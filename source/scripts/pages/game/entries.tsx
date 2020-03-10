import React from 'react';
import styled from 'styled-components';
import { Selections } from './shared/selections';
import { Picker } from './shared/picker';
import { Lock } from 'scripts/styles/lock';
import { Breakpoints } from 'scripts/variables';
import { Maybe } from 'scripts/types';

export type EntryTypes = {
  id: number;
  team: Maybe<string>;
  player: Maybe<string>;
};

const Container = styled.section`
  padding-top: 50px;

  & > ${Lock} {
    @media (min-width: ${Breakpoints.largeMin}px) {
      display: flex;

      & > * {
        &:first-child {
          @media (min-width: ${Breakpoints.largeMin}px) {
            width: 40%;
          }
        }

        &:last-child {
          @media (min-width: ${Breakpoints.largeMin}px) {
            width: 60%;
          }
        }
      }
    }
  }
`;

const defaultEntries = () =>
  Array.from(Array(32).keys()).map(number => ({
    id: number + 1,
    team: null,
    player: null,
  }));

export const Entries = () => {
  const list = defaultEntries();

  return (
    <Container>
      <Lock>
        <Selections list={list} />
        <Picker list={list} />
      </Lock>
    </Container>
  );
};
