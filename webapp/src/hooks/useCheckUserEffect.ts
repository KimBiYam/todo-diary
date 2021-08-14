import { useEffect, useState } from 'react';
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

    setIsLoading(true);

    userApi
      .getCurrentUser()
      .then((user) => {
        userLogIn(user);
      })
      .catch(() => {
        userLogOut();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { isLoading };
};

export default useCheckUserEffect;
