import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Lock } from 'scripts/styles/lock';
import { AccessabilityElement } from 'scripts/styles/accessability';
import { MediumSans } from 'scripts/styles/fonts';
import { RootState, UserType } from 'scripts/types';

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
        {/* 
        <Area>
          <MediumSans></MediumSans>
        </Area> */}
      </Lock>
    </Container>
  );
};
