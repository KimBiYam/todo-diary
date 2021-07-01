import apiClient from '../apiClient';

export const signUpGoogleAccount = async (googleToken: string) => {
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
