import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Color, Breakpoints } from 'scripts/variables';
import { EntryType } from '../shared/game-types';
import { Maybe } from 'scripts/types';

type SelectionsPropsType = {
  entries: Array<EntryType>;
  currentSelection: Maybe<EntryType>;
  handleSelectionClick: (arg: EntryType) => void;
};

const EntryListContainer = styled.div`
  width: 100%;

  @media (min-width: ${Breakpoints.mediumMin}px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 3px 2px;
    background-color: ${Color.darkBlue};
  }

  @media (min-width: ${Breakpoints.largeMin}px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${Breakpoints.desktopMin}px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const EntryLayout = styled.button<{
  teamColor?: Maybe<string>;
  activeSelection: boolean;
}>`
  padding: 15px;
  width: 100%;
  background-color: white;

  @media (max-width: ${Breakpoints.smallMax}px) {
    border-bottom: 2px solid ${Color.darkBlue};
  }

  &:hover .number > p {
    ${({ teamColor }) => teamColor && `background-color: ${teamColor}`};
    ${({ teamColor }) => teamColor && `color: white;`};
  }

  &:last-of-type {
    border-bottom: none;
  }
`;

const EntryWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Number = styled.div<{
  teamColor?: Maybe<string>;
  active?: boolean;
}>`
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: height 0.5s;
  ${({ teamColor }) => teamColor && `background-color: ${teamColor}`};

  & p {
    font-weight: 700;
    color: black;
    ${({ teamColor }) => teamColor && `background-color: ${Color.white}`};
    height: 90%;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: height 1s, background 0.5s, color 0.5s;
  }
`;

const Player = styled.div`
  padding: 0 20px;
  text-align: left;

  & span {
    font-weight: 700;
    display: block;
    line-height: 1em;
  }
`;

const Team = styled.div`
  height: 50px;
  width: 50px;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  & img {
    object-fit: contain;
    object-position: center;
    width: 40px;
    position: relative;
  }
`;

export const Selections: FunctionComponent<SelectionsPropsType> = ({
  entries,
  currentSelection,
  handleSelectionClick,
}) => {
  if (entries) {
    return (
      <EntryListContainer>
        {entries.map((entry: EntryType, placement) => {
          const activeSelection = currentSelection?.id === entry.id;
          const completedSelection = !!entry.athlete;
          const teamColor = completedSelection
            ? entry?.organization?.primary_color
            : null;

          return (
            <EntryLayout
              key={entry.id}
              type="button"
              teamColor={teamColor}
              onClick={() => handleSelectionClick(entry)}
              data-ref={`selection-${placement}`}
              activeSelection={activeSelection}
            >
              <EntryWrapper>
                <Number
                  teamColor={teamColor}
                  active={currentSelection?.id === entry.id}
                  className="number"
                >
                  <p>{placement + 1}</p>
                </Number>
                {completedSelection && (
                  <Player>
                    <span>{entry?.athlete?.first_name}</span>
                    <span>{entry?.athlete?.last_name}</span>
                  </Player>
                )}
                {!completedSelection && !activeSelection && (
                  <p>Click to Make Active</p>
                )}
                {!completedSelection && activeSelection && (
                  <p className="active">Active Selection</p>
                )}
                <Team className="team">
                  <img
                    src={`/images/teams/${entry?.organization?.image}`}
                    alt={`image of ${entry?.organization?.name}`}
                  />
                </Team>
              </EntryWrapper>
            </EntryLayout>
          );
        })}
      </EntryListContainer>
    );
  }

  // To Do : Add Error State

  return null;
};
