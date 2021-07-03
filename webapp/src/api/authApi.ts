import { User } from '../types/user.types';
import apiClient from './apiClient';

const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/api/auth/user/profile');
    const { email, displayName, photoUrl } = response.data;

    const user: User = { email, displayName, photoUrl };
    return user;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const checkGoogleAccount = async (googleToken: string) => {
  try {
    const response = await apiClient.get('/api/auth/google/check', {
      params: { googleToken },
    });

    return response.data.exists;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const signInGoogleAccount = async (googleToken: string) => {
  try {
    const response = await apiClient.post('/api/auth/google/sign-in', {
      googleToken,
    });

    const data = response.data;
    const { accessToken, email, displayName, photoUrl } = data;

    const user: User = { email, displayName, photoUrl };
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
