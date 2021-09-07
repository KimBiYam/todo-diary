import SignInButton from './SignInButton';

export type GithubSignInButtonProps = {
  onClick: () => void;
};

const GithubSignInButton = ({ onClick }: GithubSignInButtonProps) => {
  return (
    <SignInButton
      onClick={onClick}
      icon="githubIcon"
      label="Github 계정으로 로그인"
    />
  );
};

export default GithubSignInButton;
