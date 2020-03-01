import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import store from 'scripts/store';
import Router from 'scripts/pages/router';
import { RootState, SessionType } from './types';

const mount = document.querySelector('#app');
const httpLink = createHttpLink({
  uri: `${process.env.API_URL}`,
});

const Apollo = () => {
  const session = useSelector<RootState, SessionType>(
    state => state.sessionState,
  );

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: session?.token ? `Bearer ${session.token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ApolloProvider>
  );
};

const App = () => (
  <Provider store={store}>
    <Apollo />
  </Provider>
);

ReactDOM.render(<App />, mount);
