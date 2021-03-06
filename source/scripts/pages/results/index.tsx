import React, { useState, FunctionComponent } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { Loader } from 'scripts/styles/loader';
import { Color, Breakpoints } from 'scripts/variables';
import {
  GetEntriesQuery,
  GetEntriesQueryVariables,
  Maybe,
} from 'scripts/generated/types';
import { EntryType } from '../entry/shared/game-types';

type Entry = {
  id: string;
  score: Maybe<string | number>;
  name: string;
  user: Maybe<{
    username: string;
  }>;
  selections: Array<EntryType>;
};

type EntryProps = {
  place: number;
  entry: Entry;
};

const ENTRIES_QUERY = gql`
  query getEntries {
    entries {
      id
      score
      name
      user {
        username
      }
      selections {
        id
        score
        pick_number
        athlete {
          id
          first_name
          last_name
          school
          position
          school_standing
          image
        }
        organization {
          id
          name
          city
          image
          primary_color
        }
      }
    }
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 80px;
`;

const EntryWrapper = styled.div``;

const EntryWrapperRow = styled.div`
  display: flex;
  align-items: center;
  padding: 30px 20px;
  border-bottom: 1px solid ${Color.lighterGray};
  transition: background 1s;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    background-color: ${Color.lighterGray};
  }

  & > p {
    width: 50px;
    font-weight: 700;
    font-size: 22px;
  }

  & .score {
    margin-left: auto;
    font-family: 'Noto Serif', serif;
    text-align: right;
  }

  & > div {
    flex-grow: 1;
  }
`;

const EntryRows = styled.div`
  & .name {
    font-size: 20px;
  }

  & .user {
    font-size: 14px;
    margin: 15px 0;
  }

  & button {
    font-size: 14px;
  }
`;

const EntryDetails = styled.div<{
  show: boolean;
}>`
  max-height: ${({ show }) => (show ? '2000px' : '0')};
  overflow: hidden;
  transition: max-height 1s;

  & > div {
    padding: 10px 20px;
    border-bottom: 1px solid ${Color.lighterGray};
    display: flex;
    align-items: center;

    &:last-of-type {
      border-bottom: none;
    }

    & > p {
      width: 30px;
    }
  }

  & > div > div {
    flex-grow: 1;

    & > div:first-of-type {
      margin-bottom: 5px;
    }

    & p {
      display: inline-block;
      margin-left: 0.2em;
    }
  }
`;

const ResultEntry: FunctionComponent<EntryProps> = ({ entry, place }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <EntryWrapper>
      <EntryWrapperRow>
        <p className="place">{place + 1}</p>
        <div>
          <EntryRows>
            <p className="name">{entry?.name}</p>
            <p className="user">from: {entry.user?.username}</p>
            <button onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? `Close` : `View`} Details
            </button>
          </EntryRows>
        </div>
        <p className="score">{entry.score}</p>
      </EntryWrapperRow>
      <EntryDetails show={showDetails}>
        {entry.selections?.map((selection) => (
          <div key={`selection-${selection.id}`}>
            <p>{selection.pick_number}</p>
            <div>
              <div>
                <p>{selection.organization.city}</p>
                <p>{selection.organization.name}</p>
              </div>
              <div>
                <p>{selection.athlete?.first_name}</p>
                <p>{selection.athlete?.last_name}</p>
              </div>
            </div>
            <p>{selection?.score ? selection?.score : 0}</p>
          </div>
        ))}
      </EntryDetails>
    </EntryWrapper>
  );
};

export const Results = () => {
  const { data, loading, error, refetch } = useQuery<
    GetEntriesQuery,
    GetEntriesQueryVariables
  >(ENTRIES_QUERY, {
    pollInterval: 120000,
  });

  if (loading) return <Loader />;
  if (error) return null;

  const entryScore = (entry: Entry) =>
    entry.selections.reduce((value, selection) => {
      if (selection?.score) {
        return value + parseFloat(selection.score);
      }
      return value + 0;
    }, 0);

  const entries = data?.entries.map((entry) => ({
    ...entry,
    score: entryScore(entry),
  }));

  entries?.sort((a, b) => {
    if (a.score > b.score) return -1;
    if (b.score > a.score) return 1;

    return 0;
  });

  return (
    <Container>
      {entries?.map((entry, place) => (
        <ResultEntry key={`entry-${entry.id}`} entry={entry} place={place} />
      ))}
    </Container>
  );
};
