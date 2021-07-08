import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import authApi from '../api/authApi';
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

    authApi
      .getUserProfile()
      .then((user) => {
        userLogIn(user);
      })
      .catch((e: AxiosError) => {
        const { response } = e;
        const { status } = response!;

        if (status === 401) {
          userLogOut();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { isLoading };
};

export default useCheckUserEffect;
