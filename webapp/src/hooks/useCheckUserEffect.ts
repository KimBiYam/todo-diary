import { useEffect } from 'react';
import { getUserProfile } from '../api/auth';
import tokenStorage from '../storage/tokenStorage';
import useUser from './useUser';

const useCheckUserEffect = () => {
  const { userLogin, userLogout } = useUser();

  useEffect(() => {
    if (!tokenStorage.isTokenExists()) {
      return;
    }

    getUserProfile()
      .then((user) => {
        userLogin(user);
      })
      .catch((e) => {
        console.error(e);
        userLogout();
      });
  }, []);
};

export default useCheckUserEffect;
