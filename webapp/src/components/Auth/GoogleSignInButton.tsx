import React from 'react';
import { css } from '@emotion/react';
import GoogleLogin from 'react-google-login';
import useGoogleAuth from '../../hooks/useGoogleAuth';
import { COLORS } from '../../constants';

export type GoogleSignInButtonProps = {};

const GoogleSignInButton = () => {
  const [handleOnSuccess, handleOnFailure, handleOnRequest] = useGoogleAuth();

  return (
    <GoogleLogin
      css={googleSignInButton}
      clientId={String(process.env.REACT_APP_GOOGLE_CLIENT_ID)}
      buttonText="Sign In with Google"
      onSuccess={handleOnSuccess}
      onFailure={handleOnFailure}
      onRequest={handleOnRequest}
    />
  );
};

const googleSignInButton = css`
  width: 100%;
  height: 100%;
  flex: 1 !important;
  border: none !important;
  color: #bdbdbd !important;
  transition: transform 200ms ease-in-out;
  opacity: 1 !important;

  div {
    margin-right: 0 !important;
    padding: 14px !important;
  }

  span {
    color: ${COLORS.secondary};
    font-size: 20px;
    font-weight: bold;
  }

  :hover {
    transform: scale(1.05);
  }
`;

export default GoogleSignInButton;
