import { createStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import rootReducer, { RootState } from '../reducers/rootReducer';

export const prepareMockWrapper = (initialState?: RootState) => {
  const middleWares = getDefaultMiddleware();
  const store = configureMockStore(middleWares)(initialState);
  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );

  return { wrapper, store, queryClient };
};

const prepareWrapper = (initialState?: RootState) => {
  const store = createStore(rootReducer, initialState);
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );

  return { wrapper, store, queryClient };
};

export default prepareWrapper;
