import authApi from '../api/authApi';
import tokenStorage from '../storage/tokenStorage';
import useUser from './useUser';

const useGoogleAuth = () => {
  const { userLogin, userLogout } = useUser();

  const signIn = async (googleToken: string) => {
    const signInResponse = await authApi.signInGoogleAccount(googleToken);

    const { accessToken, user } = signInResponse;

    tokenStorage.setToken(accessToken);
    userLogin(user);
  };

  const handleOnSuccess = async (response: any) => {
    try {
      const googleToken = response.tokenObj.access_token;

      const isExistsGoogleAccount = await authApi.checkGoogleAccount(
        googleToken,
      );

      if (isExistsGoogleAccount) {
        await signIn(googleToken);
      } else {
        await authApi.signUpGoogleAccount(googleToken);
        await signIn(googleToken);
      }
    } catch (e) {
      userLogout();
      console.log(e);
    }
  };

  const handleOnFailure = (error: any) => {
    console.log(error);
  };

  const handleOnRequest = () => {
    console.log('request');
  };

  return [handleOnSuccess, handleOnFailure, handleOnRequest] as const;
};

export default useGoogleAuth;
