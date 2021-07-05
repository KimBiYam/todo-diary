import {
  CheckGoogleAccountResponseData,
  GetUserProfileResponseData,
  SignInGoogleAccountResponseData,
  User,
} from '../types/auth.types';
import apiClient from './apiClient';

const getUserProfile = async () => {
  try {
    const response = await apiClient.get<GetUserProfileResponseData>(
      '/api/auth/user/profile',
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
      '/api/auth/google/check',
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
      '/api/auth/google/sign-in',
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
    const response = await apiClient.post('/api/auth/google/sign-up', {
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
