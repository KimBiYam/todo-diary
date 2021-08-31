import SignInButton from './SignInButton';

export type GithubSignInButtonProps = {};

const GithubSignInButton = () => {
  return (
    <SignInButton
      onClick={() => console.log()}
      icon="githubIcon"
      label="Github 계정으로 로그인하기"
    />
  );
};

export default GithubSignInButton;
