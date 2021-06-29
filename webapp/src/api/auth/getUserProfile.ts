import { User } from '../../types/user.types';
import client from '../client';

export const getUserProfile = async () => {
  try {
    const response = await client.get('/api/auth/user/profile');
    const { email, displayName, photoUrl } = response.data;

    const user: User = { email, displayName, photoUrl };
    return user;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
