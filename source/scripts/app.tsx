import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Header from './components/Header';
import Home from 'scripts/pages/Home';

const client = new ApolloClient({
  uri: 'https://fantasy-draft-api.localhost.dev/graphql',
});

const mount = document.querySelector('#app');

const Wrapper = () => (
  <ApolloProvider client={client}>
    <Header />
    <BrowserRouter>
      <Route path="/" exact={true} render={() => <Home />} />
    </BrowserRouter>
  </ApolloProvider>
);

ReactDOM.render(<Wrapper />, mount);
