import { useTypedSelector } from '../reducers/rootReducer';

const useDialogSelector = () => {
  const dialog = useTypedSelector((state) => state.dialog);

  return { dialog };
};

export default useDialogSelector;
