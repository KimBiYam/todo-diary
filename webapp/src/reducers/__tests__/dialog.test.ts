import configureStore from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import dialogReducer, {
  closeDialog,
  DialogState,
  openDialog,
  openDialogWithDelay,
} from '../dialog';
import { RootState } from '../rootReducer';

describe('dialog reducer', () => {
  const setup = () => {
    const middleWares = getDefaultMiddleware();
    const mockStore = configureStore(middleWares);

    return { mockStore };
  };

  it('should has a initial state', () => {
    //given
    const initialState: DialogState = {
      isOpen: false,
      text: undefined,
    };

    //when
    const state = dialogReducer(undefined, { type: '@@INIT' });

    //then
    expect(state).toEqual(initialState);
  });

  it('should success open dialog when used open dialog action', () => {
    //given
    const initialState: DialogState = {
      isOpen: false,
      text: undefined,
    };

    // when
    const state = dialogReducer(initialState, openDialog('test'));

    // then
    expect(state.isOpen).toEqual(true);
    expect(state.text).toEqual('test');
  });

  it('should success open dialog when used open dialog with delay action', async () => {
    //given
    const initialState: RootState = {
      dialog: {
        isOpen: false,
        text: undefined,
      },
    } as RootState;

    const { mockStore } = setup();
    const store = mockStore(initialState);

    // when
    await store.dispatch(
      openDialogWithDelay({ text: 'test', openTime: 1 }) as any,
    );

    // then
    expect(store.getActions()[0].type).toEqual(
      openDialogWithDelay.pending.type,
    );
    expect(store.getActions()[1]).toEqual({
      payload: 'test',
      type: openDialog.type,
    });
    expect(store.getActions()[2]).toEqual({
      type: closeDialog.type,
    });
  });

  it('should success close dialog when used close dialog action', () => {
    // given
    const initialState: DialogState = {
      isOpen: true,
      text: 'test',
    };

    // when
    const state = dialogReducer(initialState, closeDialog());

    // then
    expect(state.isOpen).toEqual(false);
    expect(state.text).toEqual(undefined);
  });
});
