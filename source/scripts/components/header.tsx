import React, { useEffect, FunctionComponent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setAlertAction, setUserAction, setSessionAction } from 'scripts/store';
import { Lock } from 'scripts/styles/lock';
import { Color, Breakpoints } from 'scripts/variables';
import {
  LogoutMutation,
  LogoutMutationVariables,
} from 'scripts/generated/types';
import { RootState, UserType, SessionType } from 'scripts/types';

const LOGOUT = gql`
  mutation logout {
    logout {
      status
      message
    }
  }
`;

const HEADER_QUERY = gql`
  query headerUserEntries($id: ID!) {
    users(id: $id) {
      entries {
        id
        name
      }
    }
  }
`;

const Wrapper = styled.header`
  display: block;
  height: 39px;
  position: fixed;
  width: 100%;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: ${Breakpoints.largeMin}px) {
    height: 65px;
  }

  & > ${Lock} {
    padding-right: 0;
  }

  & .header-layout {
    display: flex;
    align-items: center;
    height: 100%;
    position: relative;

    & > a {
      position: absolute;
      display: block;
      top: 5px;
      height: 50px;

      @media (min-width: ${Breakpoints.largeMin}px) {
        height: 88px;
      }
    }
  }

  & nav {
    display: flex;
    margin-left: auto;
    align-items: center;
    height: 100%;

    & > * {
      padding: 0 10px;
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 12px;
      letter-spacing: 1px;
      font-weight: 400;

      @media (min-width: ${Breakpoints.largeMin}px) {
        padding: 0 20px;
        font-size: 14px;
      }
    }

    & a:hover {
      text-decoration: none;
    }
  }

  & .login {
    position: relative;

    @media (max-width: 1199px) {
      background-color: ${Color.darkBlue};
      padding: 10px 15px;
      color: ${Color.white};
    }
  }
`;

const LoggedIn: FunctionComponent<{ entriesCount: number }> = ({
  entriesCount,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [logoutAction, { error, loading, data }] = useMutation<
    LogoutMutation,
    LogoutMutationVariables
  >(LOGOUT);

  useEffect(() => {
    if (data?.logout?.status === 'TOKEN_REVOKED') {
      dispatch(
        setAlertAction({
          type: 'notice',
          text: 'You have been logged out',
        }),
      );

      dispatch(setUserAction(null));
      dispatch(setSessionAction(null));

      history.push('/');
    }
  }, [data]);

  return (
    <nav>
      {entriesCount > 0 && (
        <Link to="/results">
          <span>Results</span>
        </Link>
      )}
      <Link to="/profile">
        <span>Profile</span>
      </Link>
      <button onClick={() => logoutAction()}>
        <span>Logout</span>
      </button>
    </nav>
  );
};

const LoggedOut = () => (
  <nav>
    <Link to="/login" className="login">
      <span>Login</span>
    </Link>
  </nav>
);

export const Header = () => {
  const user = useSelector<RootState, UserType>(state => state.userState);
  const session = useSelector<RootState, SessionType>(
    state => state.sessionState,
  );

  const { data } = useQuery(HEADER_QUERY, {
    variables: {
      id: user?.id || '',
    },
    skip: !user?.id,
  });

  return (
    <Wrapper>
      <Lock>
        <div className="header-layout">
          <a href="/">
            <img src="/images/logo.png" aria-hidden />
          </a>
          {session?.valid && user ? (
            <LoggedIn entriesCount={data?.users?.entries.length || 0} />
          ) : (
            <LoggedOut />
          )}
        </div>
      </Lock>
    </Wrapper>
  );
};
