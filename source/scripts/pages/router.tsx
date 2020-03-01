import React from 'react';
import { Route, useLocation, Redirect, Switch } from 'react-router-dom';
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
import PasswordReset from './profile/password-reset';

// Components

import Header from './components/header';
import Modal from './components/modal';
import Alert from './components/alert';
import styled from 'styled-components';

const PageWrapper = styled.div`
  padding-top: 60px;

  @media (min-width: 768px) {
    padding-top: 80px;
  }
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
      exact
      render={() => (validSession ? Component : <Redirect to="/login" />)}
    />
  );
};

// To Do : Make 404 page

const NoMatch = () => (
  <div>
    <p>No page found</p>
    <p>404 page coming soon...</p>
  </div>
);

const nonHeaderPaths = [
  '/register',
  '/login',
  '/email-verify',
  '/forgotten-password',
  '/password/reset',
];
const checkHeaderPaths = (path: string) =>
  nonHeaderPaths.find(nonPath => nonPath === path);

const Router = () => {
  const location = useLocation();

  // To Do : Clean up routes

  return (
    <div>
      <Modal />
      <Alert />

      <Route path="/password/:token" exact render={() => <PasswordReset />} />
      <Route path="/register" render={() => <Register />} />
      <Route path="/login" render={() => <Login />} />
      <Route path="/email-verify" render={() => <EmailVerification />} />
      <Route path="/forgotten-password" render={() => <ForgotPassword />} />
      {!checkHeaderPaths(location.pathname) && (
        <Layout>
          <Switch>
            <ProtectedRoute path="/profile" Component={<Profile />} />
            <ProtectedRoute path="/entries" Component={<Entries />} />
            <Route path="/" exact render={() => <Home />} />
            <Route component={NoMatch} />
          </Switch>
        </Layout>
      )}
    </div>
  );
};

export default Router;
