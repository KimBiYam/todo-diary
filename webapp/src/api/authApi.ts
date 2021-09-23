import {
  CheckSocialAccountResponse,
  SignInSocialAccountResponse,
} from '../types/auth.types';
import apiClient from './apiClient';
import { deserializeUser } from './userApi';

const API_AUTH_GOOGLE_CHECK = '/api/v1/auth/google/check';
const API_AUTH_GOOGLE_SIGN_IN = '/api/v1/auth/google/sign-in';
const API_AUTH_GOOGLE_SIGN_UP = '/api/v1/auth/google/sign-up';
const API_AUTH_GITHUB_SIGN_IN = '/api/v1/auth/github/sign-in';

const checkGoogleAccount = async (googleToken: string) => {
  const response = await apiClient.get<CheckSocialAccountResponse>(
    API_AUTH_GOOGLE_CHECK,
    {
      params: { googleToken },
    },
  );

  const { isExists } = response.data;

  return isExists;
};

const signInGoogleAccount = async (googleToken: string) => {
  const response = await apiClient.post<SignInSocialAccountResponse>(
    API_AUTH_GOOGLE_SIGN_IN,
    {
      googleToken,
    },
  );

  const { accessToken, user } = response.data;

  return { user: deserializeUser(user), accessToken };
};

const signUpGoogleAccount = async (googleToken: string) => {
  const response = await apiClient.post(API_AUTH_GOOGLE_SIGN_UP, {
    googleToken,
  });

  return response.data;
};

const signInGithubAccount = async (code: string) => {
  const response = await apiClient.post<SignInSocialAccountResponse>(
    API_AUTH_GITHUB_SIGN_IN,
    {
      code,
    },
  );

  const { accessToken, user } = response.data;

  return { user: deserializeUser(user), accessToken };
};

const authApi = {
  checkGoogleAccount,
  signInGoogleAccount,
  signUpGoogleAccount,
  signInGithubAccount,
};

export default authApi;
