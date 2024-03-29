import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import authApi from '../api/authApi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useDialogAction from '../hooks/useDialogAction';
import useUserAction from '../hooks/useUserAction';
import tokenStorage from '../storage/tokenStorage';

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
      openDialog(String((e as any).message));
      userLogOut();
      history.push('/');
    }
  };

  return (
    <div css={box}>
      <LoadingSpinner />
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

export default GithubSignInPage;
