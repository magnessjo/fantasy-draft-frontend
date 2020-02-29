import React from 'react';
import { Route, useLocation, Redirect } from 'react-router-dom';
import { isValidSession } from 'scripts/lib/session';

// Pages

import Home from './marketing/home';
import Profile from './profile';
import Entries from './game/entries';

// Login

import Register from './profile/register';
import Login from './profile/login';
import ForgotPassword from './profile/forgot-password';
import EmailVerification from './profile/verification';

// Components

import Header from './components/header';
import Modal from './components/modal';
import Alert from './components/alert';
import styled from 'styled-components';
import { setSessionAction } from 'scripts/store';

const PageWrapper = styled.div`
  padding-top: 80px;
`;

const Layout = ({
  children,
}: {
  children: JSX.Element | Array<JSX.Element>;
}) => (
  <div>
    <Header />
    <PageWrapper>{children}</PageWrapper>
  </div>
);

const ProtectedRoute = ({
  path,
  Component,
}: {
  path: string;
  Component: any;
}) => {
  const validSession = isValidSession();

  return (
    <Route
      path={path}
      render={() => (validSession ? Component : <Redirect to="/login" />)}
    />
  );
};

const nonHeaderPaths = [
  '/register',
  '/login',
  '/verification',
  '/forgotten-password',
];
const checkHeaderPaths = (path: string) =>
  nonHeaderPaths.find(nonPath => nonPath === path);

const Router = () => {
  const location = useLocation();

  return (
    <div>
      <Modal />
      <Alert />
      <Route path="/register" render={() => <Register />} />
      <Route path="/login" render={() => <Login />} />
      <Route path="/verification" render={() => <EmailVerification />} />
      <Route path="/forgotten-password" render={() => <ForgotPassword />} />
      {!checkHeaderPaths(location.pathname) && (
        <Layout>
          <Route path="/" exact={true} render={() => <Home />} />
          <ProtectedRoute path={'/profile'} Component={<Profile />} />
          <ProtectedRoute path={'/entries'} Component={<Entries />} />
        </Layout>
      )}
    </div>
  );
};

export default Router;
