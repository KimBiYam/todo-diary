import { css, keyframes } from '@emotion/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import authApi from '../api/authApi';
import useDialogAction from '../hooks/useDialogAction';
import useUserAction from '../hooks/useUserAction';
import tokenStorage from '../storage/tokenStorage';

export type GithubSignInPageProps = {};

const GithubSignInPage = () => {
  const { userLogIn, userLogOut } = useUserAction();
  const { openDialog } = useDialogAction();
  const history = useHistory();

  useEffect(() => {
    const code = history.location.search.split('code=')[1];

    if (!code) {
      history.push('/');
    }

    signIn(code);
  }, [history]);

  const signIn = async (code: string) => {
    try {
      const signInResponse = await authApi.signInGithubAccount(code);

      const { accessToken, user } = signInResponse;

      tokenStorage.setToken(accessToken);
      userLogIn(user);
    } catch (e) {
      openDialog(String(e));
      userLogOut();
      history.push('/');
    }
  };

  return (
    <div css={box}>
      <div css={spinner} />
    </div>
  );
};

const box = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const spinner = css`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;

  ${spin}
`;

export default GithubSignInPage;
