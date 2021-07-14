import { useEffect, useState } from 'react';
import userApi from '../api/userApi';
import tokenStorage from '../storage/tokenStorage';
import useUser from './useUser';

const useCheckUserEffect = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userLogIn, userLogOut } = useUser();

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
