import { css } from '@emotion/react';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import authApi from '../../api/authApi';
import { COLORS } from '../../constants';
import useUser from '../../hooks/useUser';
import tokenStorage from '../../storage/tokenStorage';

export type GoogleSignInButtonProps = {};

const GoogleSignInButton = () => {
  const { userLogIn, userLogOut } = useUser();

  const handleOnSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    const { accessToken: googleToken } = response as GoogleLoginResponse;

    const isExistsGoogleAccount = await authApi.checkGoogleAccount(googleToken);

    try {
      if (!isExistsGoogleAccount) {
        await authApi.signUpGoogleAccount(googleToken);
      }

      await googleSignIn(googleToken);
    } catch (e) {
      userLogOut();
      console.log(e);
    }
  };

  const handleOnFailure = (error: any) => {
    console.log(error);
  };

  const googleSignIn = async (googleToken: string) => {
    const signInResponse = await authApi.signInGoogleAccount(googleToken);

    const { accessToken, user } = signInResponse;

    tokenStorage.setToken(accessToken);
    userLogIn(user);
  };

  return (
    <GoogleLogin
      css={googleSignInButton}
      clientId={String(process.env.REACT_APP_GOOGLE_CLIENT_ID)}
      buttonText="Sign In with Google"
      onSuccess={handleOnSuccess}
      onFailure={handleOnFailure}
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
    padding: 0.875rem !important;
  }

  span {
    color: ${COLORS.secondary};
    font-size: 1.25rem;
    font-weight: bold;
  }

  :hover {
    transform: scale(1.05);
  }
`;

export default GoogleSignInButton;
