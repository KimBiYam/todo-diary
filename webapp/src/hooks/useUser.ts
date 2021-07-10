import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../reducers/rootReducer';
import { login, logout } from '../reducers/user';
import tokenStorage from '../storage/tokenStorage';
import { User } from '../types/auth.types';

const useUser = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const user = useTypedSelector((state) => state.user.user);
  const isLoggedIn = useTypedSelector(
    (state) => tokenStorage.isTokenExists() && state.user.user !== undefined,
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
