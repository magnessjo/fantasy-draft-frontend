import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import store from 'scripts/store';
import Router from 'scripts/pages/router';

const client = new ApolloClient({
  uri: 'https://fantasy-draft-api.localhost.dev/graphql',
});

const mount = document.querySelector('#app');

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
