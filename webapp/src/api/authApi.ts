import {
  CheckGoogleAccountResponseData,
  SignInGoogleAccountResponseData,
} from '../types/auth.types';
import apiClient from './apiClient';
import { serializeUser } from './userApi';

const API_AUTH_GOOGLE_CHECK = '/api/auth/google/check';
const API_AUTH_GOOGLE_SIGN_IN = '/api/auth/google/sign-in';
const API_AUTH_GOOGLE_SIGN_UP = '/api/auth/google/sign-up';

const checkGoogleAccount = async (googleToken: string) => {
  try {
    const response = await apiClient.get<CheckGoogleAccountResponseData>(
      API_AUTH_GOOGLE_CHECK,
      {
        params: { googleToken },
      },
    );
    const { isExists } = response.data;

    return isExists;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const signInGoogleAccount = async (googleToken: string) => {
  try {
    const response = await apiClient.post<SignInGoogleAccountResponseData>(
      API_AUTH_GOOGLE_SIGN_IN,
      {
        googleToken,
      },
    );

    const { accessToken, user } = response.data;

    return { user: serializeUser(user), accessToken };
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const signUpGoogleAccount = async (googleToken: string) => {
  try {
    const response = await apiClient.post(API_AUTH_GOOGLE_SIGN_UP, {
      googleToken,
    });

    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const authApi = {
  checkGoogleAccount,
  signInGoogleAccount,
  signUpGoogleAccount,
};

export default authApi;
