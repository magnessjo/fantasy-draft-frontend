import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Lock } from 'scripts/styles/lock';
import { AccessabilityElement } from 'scripts/styles/accessability';
import { MediumSans } from 'scripts/styles/fonts';
import { RootState, UserType } from 'scripts/types';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import {
  UserEntriesQueryVariables,
  UserEntriesQuery,
} from 'scripts/generated/types';

const USER_ENTRIES_QUERY = gql`
  query userEntries($id: ID!) {
    users(id: $id) {
      entries {
        id
        name
      }
    }
  }
`;

const Container = styled.section`
  padding: 100px 0;
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

export const Profile = () => {
  const user = useSelector<RootState, UserType>(state => state.userState);
  const { data, loading, error } = useQuery<
    UserEntriesQuery,
    UserEntriesQueryVariables
  >(USER_ENTRIES_QUERY, {
    variables: {
      id: user?.id || '',
    },
    skip: !user?.id,
  });

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

        <Area>
          <MediumSans>User Entries</MediumSans>
          {data?.users?.entries.map(({ id, name }) => (
            <Link to={`/entries/${id}`} key={`entry-${id}`}>
              {name} <br />
            </Link>
          ))}
        </Area>
      </Lock>
    </Container>
  );
};
