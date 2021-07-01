import React from 'react';
import { css } from '@emotion/react';
import GoogleSignInButton from '../components/Auth/GoogleSignInButton';

export type SignInPageProps = {};

const SignInPage = () => (
  <div css={block}>
    <div css={signInSection}>
      <h1>Todo Diary!!!</h1>
      <GoogleSignInButton />
    </div>
  </div>
);

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
  font-size: 24px;
  font-weight: bold;
  h1 {
    margin-bottom: 86px;
  }
`;

export default SignInPage;
