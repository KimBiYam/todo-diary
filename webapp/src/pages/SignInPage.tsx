import { css } from '@emotion/react';
import GoogleSignInButton from '../components/auth/GoogleSignInButton';
import { Helmet } from 'react-helmet-async';
import { COLORS } from '../constants';
import GithubSignInButton from '../components/auth/GithubSignInButton';

export type SignInPageProps = {};

// TODO : 로고 아이콘 적용
const SignInPage = () => {
  return (
    <>
      <Helmet>
        <title>Todo Diary | Sign In</title>
      </Helmet>
      <div css={block}>
        <div css={signInSection}>
          <h1>할일 다이어리</h1>
          <div css={buttonSection}>
            <GoogleSignInButton />
            <GithubSignInButton />
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

const signInSection = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 2rem;
  font-weight: bold;
  h1 {
    color: ${COLORS.secondary};
    margin-bottom: 5.5rem;
  }
`;

const buttonSection = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default SignInPage;
