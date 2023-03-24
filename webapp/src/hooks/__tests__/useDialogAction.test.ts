import { act, renderHook } from '@testing-library/react';
import {
  closeDialog,
  openDialog,
  openDialogWithDelay,
} from '../../reducers/dialog';
import { RootState } from '../../reducers/rootReducer';
import { prepareMockWrapper } from '../../utils/testUtil';
import useDialogAction from '../useDialogAction';

describe('useDialogAction hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  const setup = (initialState?: RootState) => {
    const { store, wrapper } = prepareMockWrapper(initialState);

    const { result } = renderHook(() => useDialogAction(), { wrapper });

    return { store, result };
  };

  it('should success call open dialog action', () => {
    //given
    const initialState = {
      dialog: { isOpen: false, text: undefined },
    } as RootState;

    //when
    const { store, result } = setup(initialState);

    act(() => result.current.openDialog('test'));

    //then
    const isOpenDialogWithDelayCalled = store
      .getActions()
      .some((action) => action.type === openDialogWithDelay.pending.type);

    const isOpenDialogCalled = store
      .getActions()
      .some((action) => action.type === openDialog.type);

    expect(isOpenDialogWithDelayCalled).toEqual(true);
    expect(isOpenDialogCalled).toEqual(true);
  });

  it('should call close dialog fulfilled action when after opening a dialog and openDialogTime elapsed', async () => {
    //given
    const initialState = {
      dialog: { isOpen: false, text: undefined },
    } as RootState;

    const openDialogTime = 1000;

    //when
    const { store, result } = setup(initialState);

    act(() => {
      result.current.openDialog('test', openDialogTime);
    });

    vi.runAllTimers();

    //then
    setTimeout(() => {
      const isCloseDialogCalled = store
        .getActions()
        .some((action) => action.type === closeDialog.type);

      expect(isCloseDialogCalled).toEqual(true);
    }, openDialogTime);
  });

  it('should success call close dialog action', () => {
    //given
    const initialState = {
      dialog: { isOpen: true, text: 'test' },
    } as RootState;

    //when
    const { store, result } = setup(initialState);

    act(() => {
      result.current.closeDialog();
    });

    //then
    expect(store.getActions()[0].type).toEqual(closeDialog.type);
  });
});
