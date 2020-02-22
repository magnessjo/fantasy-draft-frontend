import React from 'react';
import { Route, useLocation } from 'react-router-dom';

// Pages

import Home from './marketing/home';
import Profile from './profile';
import Athletes from './game';
import Groups from './game/groups';
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
          <Route path="/profile" render={() => <Profile />} />
          <Route path="/athlete" render={() => <Athletes />} />
          <Route path="/entries" render={() => <Entries />} />
          <Route path="/groups" render={() => <Groups />} />
        </Layout>
      )}
    </div>
  );
};

export default Router;
