import { useTypedSelector } from '../reducers/rootReducer';
import tokenStorage from '../storage/tokenStorage';

const useUserSelector = () => {
  const user = useTypedSelector((state) => state.user.user);
  const isLoggedIn = useTypedSelector(
    (state) => tokenStorage.isTokenExists() || state.user.user !== undefined,
  );

  return { user, isLoggedIn };
};

export default useUserSelector;
