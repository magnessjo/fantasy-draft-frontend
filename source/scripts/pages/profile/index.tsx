import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Lock } from 'scripts/styles/lock';
import { AccessabilityElement } from 'scripts/styles/accessability';
import { MediumSans } from 'scripts/styles/fonts';
import { RootState, UserType } from 'scripts/types';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Breakpoints, Color } from 'scripts/variables';
import {
  UserEntriesQueryVariables,
  UserEntriesQuery,
  DeleteEntryMutation,
  DeleteEntryMutationVariables,
} from 'scripts/generated/types';
import { setModalAction } from 'scripts/store';

const USER_ENTRIES_QUERY = gql`
  query userEntries($id: ID!) {
    users(id: $id) {
      id
      entries {
        id
        name
      }
    }
  }
`;

const DELETE_ENTRY_MUTATION = gql`
  mutation deleteEntry($input: DeleteEntryInput!) {
    deleteEntry(input: $input) {
      id
      name
    }
  }
`;

const Container = styled.section`
  padding: 30px 0;
  max-width: 1000px;
  margin: 0 auto;
`;

const Area = styled.div`
  margin-bottom: 40px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const UserInfo = styled.div`
  padding-left: 15px;

  & p {
    margin-bottom: 10px;
  }

  & a {
    text-decoration: underline;
  }
`;

const EntriesList = styled.div`
  & > div {
    @media (min-width: ${Breakpoints.largeMin}px) {
      display: flex;
      padding: 20px 10px;
      transition: background 1s;

      &:hover {
        background-color: ${Color.lighterGray};
      }
    }
  }

  & button,
  & a {
    font-weight: 500;
    font-size: 18px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Actions = styled.div`
  display: flex;
  margin-left: auto;

  @media (max-width: ${Breakpoints.mediumMax}px) {
    margin-top: 20px;
  }

  & > * + * {
    margin-left: 20px;
  }
`;

export const Profile = () => {
  const user = useSelector<RootState, UserType>(state => state.userState);
  const dispatch = useDispatch();

  const [deleteEntry, { loading }] = useMutation<
    DeleteEntryMutation,
    DeleteEntryMutationVariables
  >(DELETE_ENTRY_MUTATION);

  const { data } = useQuery<UserEntriesQuery, UserEntriesQueryVariables>(
    USER_ENTRIES_QUERY,
    {
      variables: {
        id: user?.id || '',
      },
      skip: !user?.id,
    },
  );

  const entries = data?.users?.entries;

  const handleDelete = (id: string) => {
    dispatch(
      setModalAction({
        headlineText: {
          headline: `Action Required`,
          text: 'Are you sure you want to delete this entry??',
        },
        callback: function() {
          deleteEntry({
            variables: {
              input: {
                id,
                user_id: user?.id as string,
              },
            },
          });
        },
      }),
    );
  };

  return (
    <Container>
      <Lock>
        <AccessabilityElement as="h1">Profile Information</AccessabilityElement>
        <Area>
          <MediumSans>User Information</MediumSans>

          <UserInfo>
            <p>Username : {user?.username}</p>
            <p>First name : {user?.first_name}</p>
            <p>Last name : {user?.last_name}</p>
            <Link to="/forgotten-password">Reset Password</Link>
          </UserInfo>
        </Area>

        {entries && entries.length > 0 && (
          <Area>
            <MediumSans>User Entries</MediumSans>
            <EntriesList>
              {data?.users?.entries.map(({ id, name }) => (
                <div key={`entry-name-${id}`}>
                  <Link to={`/entries/${id}`} key={`entry-${id}`}>
                    {name}
                  </Link>
                  <Actions>
                    <Link to={`/entries/${id}`} key={`entry-${id}`}>
                      View Entry
                    </Link>
                    <button onClick={() => handleDelete(id)}>
                      Delete Entry
                    </button>
                  </Actions>
                </div>
              ))}
            </EntriesList>
          </Area>
        )}
      </Lock>
    </Container>
  );
};
