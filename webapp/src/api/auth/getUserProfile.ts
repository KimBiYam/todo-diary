import client from '../client';

export const getUserProfile = async () => {
  try {
    const response = await client.get('/api/auth/user/profile');

    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
