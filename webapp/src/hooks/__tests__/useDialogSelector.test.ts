import { renderHook } from '@testing-library/react';
import { RootState } from '../../reducers/rootReducer';
import { prepareMockWrapper } from '../../utils/testUtil';
import useDialogSelector from '../useDialogSelector';

describe('useDialogSelector hook', () => {
  const setup = (initialState?: RootState) => {
    const { wrapper, store } = prepareMockWrapper(initialState);

    const { result } = renderHook(() => useDialogSelector(), { wrapper });

    return { store, result };
  };

  it("should success get store's dialog state", () => {
    //given
    const initialState = {
      dialog: { isOpen: false, text: undefined },
    } as RootState;

    //when
    const { result } = setup(initialState);

    //then
    expect(result.current.dialog).toEqual(initialState.dialog);
  });
});
