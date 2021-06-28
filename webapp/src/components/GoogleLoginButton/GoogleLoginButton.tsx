import React from 'react';
import GoogleLogin from 'react-google-login';

export type GoogleLoginButtonProps = {};

const GoogleLoginButton = () => {
  const handleOnSuccess = (response: any) => {
    console.log(response.tokenObj.access_token);
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
