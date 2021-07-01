import { User } from '../../types/user.types';
import apiClient from '../apiClient';

export const getUserProfile = async () => {
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
