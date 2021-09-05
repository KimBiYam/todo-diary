import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import authApi from '../../api/authApi';
import useDialogAction from '../../hooks/useDialogAction';
import useUserAction from '../../hooks/useUserAction';
import tokenStorage from '../../storage/tokenStorage';
import SignInButton from './SignInButton';

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

      await signIn(googleToken);
    } catch (e) {
      openDialog(String(e));
      userLogOut();
    }
  };

  const signIn = async (googleToken: string) => {
    const signInResponse = await authApi.signInGoogleAccount(googleToken);

    const { accessToken, user } = signInResponse;

    tokenStorage.setToken(accessToken);
    userLogIn(user);
  };

  const handleFailure = () => openDialog('서버 에러입니다');

  return (
    <GoogleLogin
      clientId={String(process.env.REACT_APP_GOOGLE_CLIENT_ID)}
      render={({ onClick, disabled }) => (
        <SignInButton
          label="Google 계정으로 로그인"
          icon="googleIcon"
          onClick={onClick}
          disabled={disabled}
        />
      )}
      onSuccess={handleSuccess}
      onFailure={handleFailure}
    />
  );
};

export default GoogleSignInButton;
