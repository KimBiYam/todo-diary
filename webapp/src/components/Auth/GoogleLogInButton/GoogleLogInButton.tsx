import React from 'react';
import GoogleLogin from 'react-google-login';
import useGoogleAuth from '../../../hooks/useGoogleAuth';

export type GoogleLogInButtonProps = {};

const GoogleLogInButton = () => {
  const [handleOnSuccess, handleOnFailure, handleOnRequest] = useGoogleAuth();

  return (
    <GoogleLogin
      clientId={String(process.env.REACT_APP_GOOGLE_CLIENT_ID)}
      buttonText="Login"
      onSuccess={handleOnSuccess}
      onFailure={handleOnFailure}
      onRequest={handleOnRequest}
    />
  );
};

export default GoogleLogInButton;
