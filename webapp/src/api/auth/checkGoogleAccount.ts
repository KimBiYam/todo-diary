import apiClient from '../apiClient';

export const checkGoogleAccount = async (googleToken: string) => {
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
