import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, useLocation } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Header from './components/Header';
import Home from 'scripts/pages/Home';
import Signup from 'scripts/pages/sign-up';
import Modal from './components/Modal';
import store from 'scripts/store';
import Athletes from './pages/Athletes';

const client = new ApolloClient({
  uri: 'https://fantasy-draft-api.localhost.dev/graphql',
});

const mount = document.querySelector('#app');

const Layout = ({
  children,
}: {
  children: JSX.Element | Array<JSX.Element>;
}) => (
  <div>
    <Header />
    {children}
  </div>
);

const Router = () => {
  const location = useLocation();

  return (
    <div>
      <Modal />
      <Route path="/sign-up" exact={true} render={() => <Signup />} />
      {location.pathname !== '/sign-up' && (
        <Layout>
          <Route path="/" exact={true} render={() => <Home />} />
          <Route path="/athlete" exact={true} render={() => <Athletes />} />
        </Layout>
      )}
    </div>
  );
};

const Wrapper = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>
);

ReactDOM.render(<Wrapper />, mount);
