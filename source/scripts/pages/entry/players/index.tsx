import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Loader } from 'scripts/styles/loader';
import { Color } from 'scripts/variables';
import { TeamPlayerLayout, ScrollList, Summary } from '../shared/styles';
import { EntryType, UpdateSelectionType } from '../shared/game-types';
import {
  Athlete,
  GetPlayersQuery,
  GetPlayersQueryVariables,
} from 'scripts/generated/types';

type PlayerPickerProps = {
  handleUpdateSelection: (arg: UpdateSelectionType) => void;
  currentSelection: EntryType;
  setShowPlayer?: (arg: Athlete) => void;
};

const PLAYER_QUERY = gql`
  query getPlayers($year: String!) {
    athletes(eligible_year: $year) {
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

const PlayerWrapper = styled.div`
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

const SummaryFilter = styled.div`
  display: flex;
  height: 30px;

  & button {
    font-size: 12px;
    margin-left: auto;
  }
`;

export const PlayerPicker: FunctionComponent<PlayerPickerProps> = ({
  handleUpdateSelection,
  currentSelection,
  setShowPlayer,
}) => {
  const { data, loading } = useQuery<GetPlayersQuery, GetPlayersQueryVariables>(
    PLAYER_QUERY,
    {
      variables: {
        year: '2020',
      },
    },
  );
  const players = data?.athletes;

  const handleShowFilter = () => {
    console.log('you need to finish this');
  };

  const handleShowInfo = (player: Athlete) => {
    if (setShowPlayer) {
      setShowPlayer(player);
    }
  };

  return (
    <TeamPlayerLayout>
      <SummaryFilter>
        <Summary>Players</Summary>
        <button>Filter</button>
      </SummaryFilter>
      <ScrollList>
        {loading && <Loader />}
        {players &&
          players.map(player => (
            <PlayerWrapper key={`player-${player.id}`}>
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
