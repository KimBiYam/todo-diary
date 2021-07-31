import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';

export type DialogState = {
  isOpen: boolean;
  text: string | undefined;
};

const initialState: DialogState = {
  isOpen: false,
  text: undefined,
};

const delayDialog = (openTime: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(true), openTime);
  });

export const openDialogWithDelay = createAsyncThunk(
  'dialog/openDialogWithDelay',
  async (arg: { text: string; openTime: number }, { getState, dispatch }) => {
    const { text, openTime } = arg;
    const {
      dialog: { isOpen },
    } = getState() as RootState;

    if (isOpen) {
      return;
    }

    dispatch(openDialog(text));

    await delayDialog(openTime);

    dispatch(closeDialog());
  },
);

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.text = action.payload;
    },
    closeDialog: (state) => {
      state.isOpen = false;
      state.text = undefined;
    },
  },
});

const { reducer, actions } = dialogSlice;

export const { openDialog, closeDialog } = actions;

export default reducer;
