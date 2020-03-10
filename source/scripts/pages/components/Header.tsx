import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setAlertAction, setUserAction, setSessionAction } from 'scripts/store';
import { isValidSession } from 'scripts/lib/session';
import { Lock } from 'scripts/styles/lock';
import { Color, Breakpoints } from 'scripts/variables';
import {
  LogoutMutation,
  LogoutMutationVariables,
} from 'scripts/generated/types';

const LOGOUT = gql`
  mutation logout {
    logout {
      status
      message
    }
  }
`;

const Wrapper = styled.header`
  display: block;
  height: 60px;
  position: fixed;
  width: 100%;
  z-index: 9;
  background-color: white;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: ${Breakpoints.largeMin}px) {
    height: 80px;
  }

  & ${Lock} {
    padding-right: 0;
    width: 100%;
    max-width: 100%;
  }

  & .header-layout {
    display: flex;
    align-items: center;
    height: 100%;

    & > a {
      height: 80%;
      display: block;
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
      font-size: 14px;

      @media (min-width: ${Breakpoints.largeMin}px) {
        padding: 0 20px;
      }
    }

    & a:hover {
      text-decoration: none;
    }
  }

  & .login {
    font-weight: 700;
    background-color: ${Color.blue};
    padding: 10px 20px;
    letter-spacing: 0.5px;
    color: ${Color.white};
  }
`;

const LoggedIn = () => {
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
      <Link to="/entries">
        <span>Entries</span>
      </Link>
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
  return (
    <Wrapper>
      <Lock>
        <div className="header-layout">
          <a href="/">
            <img src="/images/logo.png" aria-hidden />
          </a>
          {isValidSession() ? <LoggedIn /> : <LoggedOut />}
        </div>
      </Lock>
    </Wrapper>
  );
};
