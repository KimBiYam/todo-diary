import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import authApi from '../api/authApi';
import { COLORS } from '../constants';
import useDialogAction from '../hooks/useDialogAction';
import useUserAction from '../hooks/useUserAction';
import tokenStorage from '../storage/tokenStorage';
import { spin } from '../styles/transitions';

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

const spinner = css`
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid ${COLORS.quaternary};
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;

  ${spin}
`;

export default GithubSignInPage;
