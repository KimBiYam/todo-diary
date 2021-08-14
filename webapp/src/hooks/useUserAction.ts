import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { login, logout } from '../reducers/user';
import tokenStorage from '../storage/tokenStorage';
import { User } from '../types/auth.types';

const useUserAction = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const userLogIn = (user: User) => {
    dispatch(login(user));
  };

  const userLogOut = useCallback(() => {
    tokenStorage.clearToken();
    dispatch(logout());
    queryClient.clear();
  }, [tokenStorage, dispatch, queryClient]);

  return { userLogIn, userLogOut };
};

export default useUserAction;
