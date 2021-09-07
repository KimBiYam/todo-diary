import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import SignInButton from './SignInButton';

export type GoogleSignInButtonProps = {
  onSuccess: (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => void;
  onFailure: () => void;
};

const GoogleSignInButton = ({
  onSuccess,
  onFailure,
}: GoogleSignInButtonProps) => (
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
    onSuccess={onSuccess}
    onFailure={onFailure}
  />
);

export default GoogleSignInButton;
