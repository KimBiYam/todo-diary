import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { store } from './modules/store';
import { queryClient } from './modules/queryClient';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './modules/apolloClient';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
            <App />
          </QueryClientProvider>
        </ApolloProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
);
