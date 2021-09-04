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

  return <></>;
};

export default GithubSignInPage;
