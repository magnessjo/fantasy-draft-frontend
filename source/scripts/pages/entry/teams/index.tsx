import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Loader } from 'scripts/styles/loader';
import { Color, Breakpoints } from 'scripts/variables';
import { TeamPlayerLayout, ScrollList, Summary } from '../shared/styles';
import { UpdateSelectionType, EntryType } from '../shared/game-types';
import {
  GetOrganizationsQuery,
  GetOrganizationsQueryVariables,
} from 'scripts/generated/types';

type TeamPickerProps = {
  handleUpdateSelection: (arg: UpdateSelectionType) => void;
  currentSelection: EntryType;
};

const ORGANIZATION_QUERY = gql`
  query getOrganizations {
    organization {
      data {
        id
        name
        city
        image
        primary_color
      }
    }
  }
`;

const TeamLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1px;
  background-color: rgba(0, 0, 0, 0.05);

  @media (min-width: ${Breakpoints.largeMin}px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${Breakpoints.desktopMin}px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const TeamWrapper = styled.div`
  padding: 10px;
  padding-right: 30px;
  height: 60px;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${Color.white};
  transition: background 0.5s;
  position: relative;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    background-color: ${Color.lighterGray};
  }

  & img {
    width: 40px;
    height: auto;
    object-fit: contain;
  }

  & p {
    padding: 0 10px;
    font-size: 12px;
  }

  & span {
    padding-right: 0.2em;
    display: inline-block;
  }
`;

const AddButton = styled.button`
  width: 40px;
  height: 40px;
  display: block;
  background-image: url('/images/icons/add.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 12px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

export const TeamPicker: FunctionComponent<TeamPickerProps> = ({
  handleUpdateSelection,
  currentSelection,
}) => {
  const { data, loading } = useQuery<
    GetOrganizationsQuery,
    GetOrganizationsQueryVariables
  >(ORGANIZATION_QUERY);
  const teams = data?.organization?.data;

  return (
    <TeamPlayerLayout>
      <Summary>Teams</Summary>
      <ScrollList>
        {loading && <Loader />}
        {teams && (
          <TeamLayout>
            {teams.map(team => (
              <TeamWrapper key={`team-${team.name}`}>
                <img
                  src={`/images/teams/${team.image}`}
                  alt={`image of ${team.name} logo`}
                />
                <p>
                  <span>{team.city}</span>
                  {team.name}
                </p>
                <AddButton
                  onClick={() =>
                    handleUpdateSelection({
                      player: currentSelection.athlete,
                      organization: team,
                      currentSelection,
                    })
                  }
                />
              </TeamWrapper>
            ))}
          </TeamLayout>
        )}
      </ScrollList>
    </TeamPlayerLayout>
  );
};
