import { useCallback } from 'react';
import {
  openDialogWithDelay,
  closeDialog as closeDialogAction,
} from '../reducers/dialog';
import useAppDispatch from './useAppDispatch';

const useDialogAction = () => {
  const dispatch = useAppDispatch();

  const openDialog = useCallback(
    (text: string, openTime: number = 2 * 1000) => {
      dispatch(openDialogWithDelay({ text, openTime }));
    },
    [dispatch],
  );

  const closeDialog = useCallback(
    () => dispatch(closeDialogAction()),
    [dispatch],
  );

  return { openDialog, closeDialog };
};

export default useDialogAction;
