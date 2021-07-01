import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers/store';
import { login, logout } from '../reducers/user';
import tokenStorage from '../storage/tokenStorage';
import { User } from '../types/user.types';

const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const isLoggedIn = useSelector(
    (state: RootState) =>
      tokenStorage.isTokenExists() || state.user.user !== undefined,
  );

  const userLogin = (user: User) => {
    dispatch(login(user));
  };

  const userLogout = () => {
    tokenStorage.clearToken();
    dispatch(logout());
  };

  return { user, isLoggedIn, userLogin, userLogout };
};

export default useUser;
