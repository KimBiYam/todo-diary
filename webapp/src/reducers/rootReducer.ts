import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AnyAction, combineReducers } from 'redux';
import user from './user';
import dialog from './dialog';
import { ThunkDispatch } from '@reduxjs/toolkit';

const rootReducer = combineReducers({ user, dialog });

export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export default rootReducer;
