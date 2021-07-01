import React from 'react';
import { css } from '@emotion/react';
import GoogleLogInButton from '../../components/Auth/GoogleLogInButton';

export type SignInPageProps = {};

const SignInPage = () => (
  <div css={block}>
    <div css={signInSection}>
      <h1>Todo Diary!!!</h1>
      <GoogleLogInButton />
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
  flex-direction: column;
  font-size: 24px;
  font-weight: bold;
`;

export default SignInPage;
