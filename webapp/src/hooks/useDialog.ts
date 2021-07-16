import { useDispatch } from 'react-redux';
import { openDialog as openDialogAction } from '../reducers/dialog';
import { useTypedSelector } from '../reducers/rootReducer';

const useDialog = () => {
  const dispatch = useDispatch();
  const dialog = useTypedSelector((state) => state.dialog);

  const openDialog = (text: string, openTime: number) => {
    dispatch(openDialogAction({ text, openTime }));
  };

  return { dialog, openDialog, openDialogAction };
};

export default useDialog;
