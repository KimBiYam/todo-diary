import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../reducers/user';
import tokenStorage from '../storage/tokenStorage';
import { User } from '../types/auth.types';

const useUserAction = () => {
  const dispatch = useDispatch();

  const userLogIn = (user: User) => {
    dispatch(login(user));
  };

  const userLogOut = useCallback(() => {
    tokenStorage.clearToken();
    dispatch(logout());
  }, [tokenStorage, dispatch]);

  return { userLogIn, userLogOut };
};

export default useUserAction;
