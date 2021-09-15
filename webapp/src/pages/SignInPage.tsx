import { css } from '@emotion/react';
import GoogleSignInButton from '../components/auth/GoogleSignInButton';
import { Helmet } from 'react-helmet-async';
import { GITHUB_OAUTH_URL } from '../constants';
import GithubSignInButton from '../components/auth/GithubSignInButton';
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import authApi from '../api/authApi';
import useUserAction from '../hooks/useUserAction';
import useDialogAction from '../hooks/useDialogAction';
import tokenStorage from '../storage/tokenStorage';
import { useState } from 'react';
import LoadingPage from './LoadingPage';
import Icon from '../components/common/Icon';

export type SignInPageProps = {};

// TODO : 로고 아이콘 적용
const SignInPage = () => {
  const { userLogIn, userLogOut } = useUserAction();
  const [isLoading, setIsLoading] = useState(false);
  const { openDialog } = useDialogAction();

  const handleSuccessGoogleSignIn = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    try {
      setIsLoading(true);
      const { accessToken: googleToken } = response as GoogleLoginResponse;

      const isExistsGoogleAccount = await authApi.checkGoogleAccount(
        googleToken,
      );

      if (!isExistsGoogleAccount) {
        await authApi.signUpGoogleAccount(googleToken);
      }

      await googleSignIn(googleToken);
    } catch (e) {
      openDialog('서버 에러입니다');
      userLogOut();
      setIsLoading(false);
    }
  };

  const googleSignIn = async (googleToken: string) => {
    const signInResponse = await authApi.signInGoogleAccount(googleToken);

    const { accessToken, user } = signInResponse;

    tokenStorage.setToken(accessToken);
    userLogIn(user);
  };

  const handleFailureGoogleSignIn = () => openDialog('서버 에러입니다');

  const handleClickGithubSignIn = () => {
    window.location.replace(GITHUB_OAUTH_URL);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Helmet>
        <title>Todo Diary | Sign In</title>
      </Helmet>
      <div css={block}>
        <div css={signInSection}>
          <Icon css={logo} icon="logo" />
          <div css={buttonSection}>
            <GoogleSignInButton
              onSuccess={handleSuccessGoogleSignIn}
              onFailure={handleFailureGoogleSignIn}
            />
            <GithubSignInButton onClick={handleClickGithubSignIn} />
          </div>
        </div>
      </div>
    </>
  );
};

const block = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const logo = css`
  width: 24rem;
  height: 16rem;
  margin-bottom: 1.2rem;
`;

const signInSection = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 2rem;
  font-weight: 600;
`;

const buttonSection = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default SignInPage;
