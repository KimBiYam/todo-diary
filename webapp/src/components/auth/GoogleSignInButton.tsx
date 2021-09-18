import { useEffect, useRef } from 'react';
import { GoogleSignInResponse } from '../../types/auth.types';
import SignInButton from './SignInButton';

export type GoogleSignInButtonProps = {
  onSuccess: (response: GoogleSignInResponse) => void;
  onFailure: () => void;
};

const GoogleSignInButton = ({
  onSuccess,
  onFailure,
}: GoogleSignInButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    window.gapi.load('auth2', () => {
      const auth2 = window.gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        cookiepolicy: 'single_host_origin',
      });

      auth2.attachClickHandler(
        buttonRef.current,
        {},
        (googleUser: any) => {
          const accessToken = googleUser.getAuthResponse(true).access_token;

          onSuccess({ accessToken });
        },
        () => onFailure(),
      );
    });
  }, []);

  return (
    <SignInButton
      ref={buttonRef}
      label="Google 계정으로 로그인"
      icon="googleIcon"
    />
  );
};

export default GoogleSignInButton;
