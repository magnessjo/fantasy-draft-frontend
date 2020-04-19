import React from 'react';
import { Route, useLocation, Redirect, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { isValidSession } from 'scripts/lib/session';
import { Breakpoints } from 'scripts/variables';
import { RootState, SessionType } from 'scripts/types';

// Pages

import { Home } from './marketing/home';
import { Profile } from './profile';
import { Entries } from './entry';
import { ContactPage } from './contact';
import { PrivacyPage } from './privacy';
import { Results } from './results';

// Login

import { Register } from './profile/register';
import { Login } from './profile/login';
import { ForgotPassword } from './profile/forgot-password';
import { EmailVerification } from './profile/verification';
import { PasswordReset } from './profile/password-reset';

// Components

import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Modal } from '../components/modal';
import { Alert } from '../components/alert';

const PageWrapper = styled.div<{
  homepage?: boolean;
}>`
  min-height: calc(100vh - 120px);
  padding-top: ${({ homepage = false }) => (homepage ? `0` : `65px`)};
  @media (min-width: ${Breakpoints.largeMin}px) {
    padding-top: ${({ homepage = false }) => (homepage ? `0` : `135px`)};
  }
`;

const ErrorPage = styled.div`
  min-height: calc(100vh - 80px);
  padding: 50px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  & img {
    max-width: 400px;
    margin: 0 auto 40px auto;
  }

  & p {
    font-size: 20px;
    font-size: calc(20px + 0.2vw);

    &:first-of-type {
      font-size: calc(20px + 1vw);
      margin-bottom: 20px;
      font-weight: 700;
    }
  }
`;

const checkPaths = (path: string, paths: Array<string>) =>
  paths.find(nonPath => nonPath === path);

const Layout = ({
  children,
  path,
}: {
  children: JSX.Element | Array<JSX.Element>;
  path: string;
}) => (
  <div>
    <Header />
    <PageWrapper homepage={path === '/'}>{children}</PageWrapper>
    <Footer />
  </div>
);

const ProtectedRoute = ({
  path,
  Component,
  sessionValid,
}: {
  path: string;
  Component: any;
  sessionValid?: Boolean;
}) => {
  return (
    <Route
      path={path}
      render={() => (sessionValid ? Component : <Redirect to="/login" />)}
    />
  );
};

const NoMatch = () => (
  <ErrorPage>
    <div>
      <img src="/images/404.jpg" aria-hidden="false" />
      <p>Oh no!</p>
      <p>The page that you requested could not be found</p>
    </div>
  </ErrorPage>
);

const Router = () => {
  const location = useLocation();
  const session = useSelector<RootState, SessionType>(
    state => state.sessionState,
  );
  isValidSession();

  const nonHeaderPaths = [
    '/register',
    '/login',
    '/email-verify',
    '/forgotten-password',
    '/password/reset',
  ];

  return (
    <div>
      <Modal />
      <Alert />
      <Route path="/password/:token" exact render={() => <PasswordReset />} />
      <Route path="/register" render={() => <Register />} />
      <Route path="/login" render={() => <Login />} />
      <Route path="/email-verify" render={() => <EmailVerification />} />
      <Route path="/forgotten-password" render={() => <ForgotPassword />} />
      {!checkPaths(location.pathname, nonHeaderPaths) && (
        <Layout path={location.pathname}>
          <Switch>
            <ProtectedRoute
              path="/profile"
              sessionValid={session?.valid}
              Component={<Profile />}
            />
            <ProtectedRoute
              path="/entries/:id"
              sessionValid={session?.valid}
              Component={<Entries />}
            />
            <ProtectedRoute
              path="/entries"
              sessionValid={session?.valid}
              Component={<Entries />}
            />
            <ProtectedRoute
              path="/results"
              sessionValid={session?.valid}
              Component={<Results />}
            />
            <Route path="/contact" Component={<ContactPage />} />
            <Route path="/privacy" Component={<PrivacyPage />} />
            <Route path="/" exact render={() => <Home />} />
            <Route component={NoMatch} />
          </Switch>
        </Layout>
      )}
    </div>
  );
};

export default Router;
