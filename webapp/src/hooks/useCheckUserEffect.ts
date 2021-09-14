import { useCallback, useEffect, useState } from 'react';
import userApi from '../api/userApi';
import tokenStorage from '../storage/tokenStorage';
import useUserAction from './useUserAction';

const useCheckUserEffect = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userLogIn, userLogOut } = useUserAction();

  useEffect(() => {
    if (!tokenStorage.isTokenExists()) {
      return;
    }

    signin();
  }, []);

  const signin = useCallback(async () => {
    try {
      setIsLoading(true);

      const user = await userApi.getCurrentUser();

      userLogIn(user);
    } catch (e) {
      userLogOut();
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading };
};

export default useCheckUserEffect;
