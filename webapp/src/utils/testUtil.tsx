import { createStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import rootReducer, { RootState } from '../reducers/rootReducer';

export const prepareMockWrapper = (initialState?: RootState) => {
  const middlewares = getDefaultMiddleware();
  const store = configureMockStore(middlewares)(initialState);
  const queryClinet = new QueryClient();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <QueryClientProvider client={queryClinet}>{children}</QueryClientProvider>
    </Provider>
  );

  return { wrapper, store, queryClinet };
};

const prepareWrapper = (initialState?: RootState) => {
  const store = createStore(rootReducer, initialState);
  const queryClinet = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <QueryClientProvider client={queryClinet}>{children}</QueryClientProvider>
    </Provider>
  );

  return { wrapper, store, queryClinet };
};

export default prepareWrapper;
