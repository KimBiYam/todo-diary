import client from '../client';

export const signUpGoogleAccount = async (googleToken: string) => {
  try {
    const response = await client.post('/api/auth/google/sign-up', {
      googleToken,
    });

    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
