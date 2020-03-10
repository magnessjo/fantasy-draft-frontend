import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState, UserType } from 'scripts/types';
import { Link } from 'react-router-dom';

const Container = styled.section`
  display: flex;
  min-height: calc(100vh - 80px);
`;

const Actions = styled.div`
  padding: 10px 0;
  border-right: 1px solid gray;

  & button {
    border-bottom: 1px solid gray;
    display: block;
    padding: 20px;

    &:last-of-type {
      border-bottom: none;
    }
  }
`;

const ViewContainer = styled.div`
  & > div {
    padding: 40px;
  }

  & h2 {
    margin-bottom: 20px;
  }
`;

const SETTINGS = 'settings';
const DEFAULT = 'default';

const SettingsView = () => (
  <div>
    <h2>Settings</h2>
    <Link to="/forgotten-password">Forgotten Password</Link>
  </div>
);

const DefaultView = () => {
  const user = useSelector<RootState, UserType>(state => state.userState);

  return (
    <div>
      <h2>User Information</h2>
      <p>{user?.first_name}</p>
    </div>
  );
};

export const Profile = () => {
  const [view, setView] = useState<string>(DEFAULT);

  const actionSelection = (str: string) => setView(str);

  return (
    <Container>
      <Actions>
        <button onClick={() => actionSelection(DEFAULT)}>
          User Information
        </button>
        <button onClick={() => actionSelection(SETTINGS)}>Settings</button>
      </Actions>

      <ViewContainer>
        {view === SETTINGS && <SettingsView />}
        {view === DEFAULT && <DefaultView />}
      </ViewContainer>
    </Container>
  );
};
