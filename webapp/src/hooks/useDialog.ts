import { useDispatch } from 'react-redux';
import {
  openDialog as openDialogAction,
  closeDialog as closeDialogAction,
} from '../reducers/dialog';
import { useTypedSelector } from '../reducers/rootReducer';

const useDialog = () => {
  const dispatch = useDispatch();
  const dialog = useTypedSelector((state) => state.dialog);

  const openDialog = (text: string, openTime: number = 2 * 1000) => {
    if (dialog.isOpen) {
      return;
    }

    dispatch(openDialogAction({ text, openTime }));
  };

  const closeDialog = () => dispatch(closeDialogAction());

  return { dialog, openDialog, closeDialog };
};

export default useDialog;
