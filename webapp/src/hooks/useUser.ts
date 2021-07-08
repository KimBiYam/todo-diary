import { useQueryClient } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers/store';
import { login, logout } from '../reducers/user';
import tokenStorage from '../storage/tokenStorage';
import { User } from '../types/auth.types';

const useUser = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const isLoggedIn = useSelector(
    (state: RootState) =>
      tokenStorage.isTokenExists() && state.user.user !== undefined,
  );

  const userLogIn = (user: User) => {
    dispatch(login(user));
  };

  const userLogOut = () => {
    tokenStorage.clearToken();
    dispatch(logout());
    queryClient.clear();
  };

  return { user, isLoggedIn, userLogIn, userLogOut };
};

export default useUser;
