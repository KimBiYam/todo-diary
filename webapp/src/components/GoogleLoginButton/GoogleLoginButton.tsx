import React from 'react';
import GoogleLogin from 'react-google-login';
import {
  checkGoogleAccount,
  signInGoogleAccount,
  signUpGoogleAccount,
} from '../../api/auth';
import useUser from '../../hooks/useUser';
import tokenStorage from '../../storage/tokenStorage';

export type GoogleLoginButtonProps = {};

const GoogleLoginButton = () => {
  const { userLogin, userLogout } = useUser();

  const handleOnSuccess = async (response: any) => {
    try {
      const googleToken = response.tokenObj.access_token;

      const isExistsGoogleAccount = await checkGoogleAccount(googleToken);

      if (isExistsGoogleAccount) {
        await signIn(googleToken);
      } else {
        await signUpGoogleAccount(googleToken);
        await signIn(googleToken);
      }
    } catch (e) {
      userLogout();
      console.log(e);
    }
  };

  const signIn = async (googleToken: string) => {
    const signInResponse = await signInGoogleAccount(googleToken);

    const { accessToken, user } = signInResponse;

    tokenStorage.setToken(accessToken);
    userLogin(user);
  };

  const handleOnFailure = (error: any) => {
    console.log(error);
  };

  return (
    <GoogleLogin
      clientId={String(process.env.REACT_APP_GOOGLE_CLIENT_ID)}
      buttonText="Login"
      onSuccess={handleOnSuccess}
      onFailure={handleOnFailure}
    />
  );
};

export default GoogleLoginButton;
