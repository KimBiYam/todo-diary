import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/auth.types';

export type UserState = {
  user?: User;
};

const initialState: UserState = { user: undefined };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = undefined;
    },
  },
});

const { actions, reducer } = userSlice;

export const { login, logout } = actions;

export default reducer;
