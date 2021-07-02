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
      .catch((e) => {
        console.error(e);
        userLogOut();
      });
  }, []);
};

export default useCheckUserEffect;
