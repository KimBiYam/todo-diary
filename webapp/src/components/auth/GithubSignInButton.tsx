import { CLIENT_SERVER_URL } from '../../constants';
import SignInButton from './SignInButton';

export type GithubSignInButtonProps = {};

const GITHUB_REDIRECT_URL = `${CLIENT_SERVER_URL}/sign-in/github`;
const GITHUB_OAUTH_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URL}`;

const GithubSignInButton = () => {
  const handleClick = () => {
    window.location.replace(GITHUB_OAUTH_URL);
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
