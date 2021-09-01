import { SERVER_URL } from '../../constants';
import SignInButton from './SignInButton';

export type GithubSignInButtonProps = {};

const REDIRECT_URL = `${SERVER_URL}/api/auth/github/callback`;
const GITHUB_OAUTH_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URL}`;

const GithubSignInButton = () => {
  const handleClick = () => {
    window.open(GITHUB_OAUTH_URL);
  };

  return (
    <SignInButton
      onClick={handleClick}
      icon="githubIcon"
      label="Github 계정으로 로그인하기"
    />
  );
};

export default GithubSignInButton;
