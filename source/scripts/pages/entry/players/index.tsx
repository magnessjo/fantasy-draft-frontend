import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Loader } from 'scripts/styles/loader';
import { Color, Breakpoints } from 'scripts/variables';
import { TeamPlayerLayout, ScrollList } from '../shared/styles';
import { EntryType, UpdateSelectionType } from '../shared/game-types';
import {
  Athlete,
  SearchPlayersQuery,
  SearchPlayersQueryVariables,
  Maybe,
} from 'scripts/generated/types';

type PlayerPickerProps = {
  handleUpdateSelection: (arg: UpdateSelectionType) => void;
  currentSelection: EntryType;
  setShowPlayer?: (arg: Athlete) => void;
  entries: Array<EntryType>;
};

type PlayerProps = PlayerPickerProps & {
  setSearchText: (arg: string) => void;
  players: Maybe<Array<Athlete>>;
  loading: boolean;
};

const PLAYER_SEARCH = gql`
  query searchPlayers($year: String!, $searchText: String) {
    athletes(eligible_year: $year, searchText: $searchText) {
      id
      first_name
      last_name
      image
      school
      position
      school_standing
      height
      weight
      description
    }
  }
`;

const PlayerWrapper = styled.div<{
  selected: boolean;
}>`
  padding: 10px;
  padding-right: 0;
  height: 44px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${Color.white};
  transition: background 0.5s;
  text-align: left;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    background-color: ${Color.lighterGray};
  }

  & p {
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  p.name {
    width: 120px;
    min-width: 35%;
    overflow: visible;
    white-space: pre-wrap;
    padding-right: 10px;

    & span {
      ${({ selected }) => selected && `text-decoration: line-through;`};
    }
  }

  p.position {
    width: 50px;
    min-width: 15%;
  }

  p.school {
    width: 50px;
    min-width: 20%;
  }

  & span {
    padding-right: 0.2em;
    display: inline-block;
  }
`;

const Actions = styled.div`
  display: flex;
  margin-left: auto;
  flex-grow: 1;
  justify-content: flex-end;
  min-width: 30%;
  width: 90px;
  padding-left: 10px;

  & button {
    background-repeat: no-repeat;
    background-position: center;
    height: 40px;
    width: 40px;

    &:disabled {
      opacity: 0.4;
    }
  }

  & button + button {
    margin-left: 10px;
  }

  & .select {
    background-image: url('/images/icons/add.svg');
    background-size: 12px;
  }

  & .info {
    background-image: url('/images/icons/info.svg');
    background-size: 15px;
  }
`;

const Filter = styled.div`
  padding: 10px;

  @media (min-width: ${Breakpoints.largeMin}px) {
    display: flex;
  }

  & form {
    width: 100%;
    max-width: 300px;
  }

  & input {
    width: 100%;
    max-width: 300px;
  }

  & button {
    font-size: 12px;
    margin-left: auto;

    @media (max-width: ${Breakpoints.mediumMax}px) {
      display: none;
    }
  }
`;

export const Players: FunctionComponent<PlayerProps> = ({
  handleUpdateSelection,
  currentSelection,
  setShowPlayer,
  entries,
  players,
  setSearchText,
  loading,
}) => {
  const updatedPlayers = players?.map((player: Athlete) => {
    const playerSelected = entries.some(
      entry => entry?.athlete?.id === player.id,
    );

    return { selected: playerSelected, ...player };
  });

  const handleShowInfo = (player: Athlete) => {
    if (setShowPlayer) {
      setShowPlayer(player);
    }
  };

  return (
    <TeamPlayerLayout>
      <Filter>
        <form>
          <input
            type="text"
            onChange={event => setSearchText(event.currentTarget.value)}
            placeholder="Filter by last name"
          />
        </form>
        <button
          onClick={() =>
            handleUpdateSelection({ player: null, currentSelection })
          }
        >
          Clear Selection Athlete
        </button>
      </Filter>
      <ScrollList>
        {loading && <Loader />}
        {updatedPlayers &&
          updatedPlayers.map((player: any) => (
            <PlayerWrapper
              key={`player-${player.id}`}
              selected={player.selected}
            >
              <p className="name">
                <span>{player.first_name}</span>
                <span>{player.last_name}</span>
              </p>
              <p className="position">{player.position}</p>
              <p className="school">{player.school}</p>
              <Actions>
                <button
                  className="info"
                  type="button"
                  onClick={() => handleShowInfo(player)}
                ></button>
                <button
                  className="select"
                  disabled={player.selected}
                  onClick={() =>
                    handleUpdateSelection({ player, currentSelection })
                  }
                ></button>
              </Actions>
            </PlayerWrapper>
          ))}
      </ScrollList>
    </TeamPlayerLayout>
  );
};

export const PlayerPicker: FunctionComponent<PlayerPickerProps> = props => {
  const [searchText, setSearchText] = useState('');

  const { data, loading } = useQuery<
    SearchPlayersQuery,
    SearchPlayersQueryVariables
  >(PLAYER_SEARCH, {
    variables: {
      year: '2020',
      searchText: searchText.length > 1 ? searchText : null,
    },
  });

  const players = data?.athletes;

  return (
    <Players
      {...props}
      setSearchText={setSearchText}
      loading={loading}
      players={players || null}
    />
  );
};
