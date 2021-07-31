import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  openDialogWithDelay,
  closeDialog as closeDialogAction,
} from '../reducers/dialog';

const useDialogAction = () => {
  const dispatch = useDispatch();

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
