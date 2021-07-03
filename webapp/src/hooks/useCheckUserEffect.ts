import { AxiosError } from 'axios';
import { useEffect } from 'react';
import authApi from '../api/authApi';
import tokenStorage from '../storage/tokenStorage';
import useUser from './useUser';

const useCheckUserEffect = () => {
  const { userLogIn, userLogOut } = useUser();

  useEffect(() => {
    if (!tokenStorage.isTokenExists()) {
      return;
    }

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
      });
  }, []);
};

export default useCheckUserEffect;
