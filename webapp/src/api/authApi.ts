import {
  CheckGoogleAccountResponseData,
  GetUserProfileResponseData,
  SignInGoogleAccountResponseData,
  User,
} from '../types/auth.types';
import apiClient from './apiClient';

const API_AUTH_USER_PROFILE = '/api/auth/user/profile';
const API_AUTH_GOOGLE_CHECK = '/api/auth/user/profile';
const API_AUTH_GOOGLE_SIGN_IN = '/api/auth/google/sign-in';
const API_AUTH_GOOGLE_SIGN_UP = '/api/auth/google/sign-up';

const getUserProfile = async () => {
  try {
    const response = await apiClient.get<GetUserProfileResponseData>(
      API_AUTH_USER_PROFILE,
    );
    const { email, displayName, photoUrl, createdAt } = response.data.user;

    const user: User = { email, displayName, photoUrl, createdAt };
    return user;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

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

    const { accessToken } = response.data;
    const { createdAt, displayName, email, photoUrl } = response.data.user;

    const user: User = { email, displayName, photoUrl, createdAt };
    return { user, accessToken };
  } catch (e) {
    console.log(e);
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
    console.log(e);
    throw e;
  }
};

const authApi = {
  getUserProfile,
  checkGoogleAccount,
  signInGoogleAccount,
  signUpGoogleAccount,
};

export default authApi;
