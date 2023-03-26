import { createStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import rootReducer, { RootState } from '../reducers/rootReducer';

export const prepareMockWrapper = (initialState?: RootState) => {
  const middleWares = getDefaultMiddleware();
  const store = configureMockStore(middleWares)(initialState);

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  return { wrapper, store };
};

const prepareWrapper = (initialState?: RootState) => {
  const store = createStore(rootReducer, initialState);

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  return { wrapper, store };
};

export default prepareWrapper;
