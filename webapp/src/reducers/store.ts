import { configureStore } from '@reduxjs/toolkit';
import user from './user';

const store = configureStore({
  reducer: { user },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
