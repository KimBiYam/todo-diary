import React from 'react';
import GoogleLogInButton from '../../components/Auth/GoogleLogInButton';

export type SignInPageProps = {};

const SignInPage = () => (
  <div>
    <h1>Todo Diary</h1>
    <GoogleLogInButton />
  </div>
);

export default SignInPage;
