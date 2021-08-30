import { css } from '@emotion/react';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import authApi from '../../api/authApi';
import { COLORS } from '../../constants';
import useDialogAction from '../../hooks/useDialogAction';
import useUserAction from '../../hooks/useUserAction';
import tokenStorage from '../../storage/tokenStorage';

export type GoogleSignInButtonProps = {};

const GoogleSignInButton = () => {
  const { userLogIn, userLogOut } = useUserAction();
  const { openDialog } = useDialogAction();

  const handleSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    try {
      const { accessToken: googleToken } = response as GoogleLoginResponse;

      const isExistsGoogleAccount = await authApi.checkGoogleAccount(
        googleToken,
      );

      if (!isExistsGoogleAccount) {
        await authApi.signUpGoogleAccount(googleToken);
      }

      await googleSignIn(googleToken);
    } catch (e) {
      openDialog(e);
      userLogOut();
    }
  };

  const googleSignIn = async (googleToken: string) => {
    const signInResponse = await authApi.signInGoogleAccount(googleToken);

    const { accessToken, user } = signInResponse;

    tokenStorage.setToken(accessToken);
    userLogIn(user);
  };

  const handleFailure = () => openDialog('서버 에러입니다');

  return (
    <GoogleLogin
      css={box}
      clientId={String(process.env.REACT_APP_GOOGLE_CLIENT_ID)}
      buttonText="Google 계정으로 로그인 하기"
      onSuccess={handleSuccess}
      onFailure={handleFailure}
    />
  );
};

const box = css`
  width: 25rem;
  height: 100%;
  display: flex !important;
  flex: 1 !important;
  transition: transform 200ms ease-in-out;
  opacity: 1 !important;
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.1) !important;

  div {
    margin-right: 0 !important;
    padding: 1rem !important;
  }

  span {
    flex: 1;
    color: ${COLORS.secondary};
    font-size: 1.5rem;
    font-weight: bold;
  }

  :hover {
    transform: scale(1.05);
  }
`;

export default GoogleSignInButton;
