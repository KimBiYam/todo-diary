import { css } from '@emotion/react';
import GoogleSignInButton from '../components/auth/GoogleSignInButton';
import { Helmet } from 'react-helmet-async';
import { COLORS } from '../constants';

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
          <GoogleSignInButton />
        </div>
      </div>
    </>
  );
};

const block = css`
  width: 100%;
  height: 100%;
`;

const signInSection = css`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  flex-direction: column;
  font-size: 1.5rem;
  font-weight: bold;
  h1 {
    color: ${COLORS.secondary};
    margin-bottom: 5.5rem;
  }
`;

export default SignInPage;
