import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DialogState = {
  isOpen: boolean;
  text: string | undefined;
};

const initialState: DialogState = {
  isOpen: false,
  text: undefined,
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<string>) => {
      if (state.isOpen) {
        return;
      }

      state.isOpen = true;
      state.text = action.payload;
    },
    closeDialog: (state) => {
      state.isOpen = false;
      state.text = undefined;
    },
  },
});

const { actions, reducer } = dialogSlice;

export const { openDialog, closeDialog } = actions;

export default reducer;
