import { GetUserProfileResponse, User } from '../types/auth.types';
import apiClient from './apiClient';

const API_AUTH_USERS_ME = '/api/v1/users/me';

const getCurrentUser = async () => {
  try {
    const response = await apiClient.get<GetUserProfileResponse>(
      API_AUTH_USERS_ME,
    );
    const { user } = response.data;

    return serializeUser(user);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const serializeUser = (user: User) => {
  const { email, displayName, photoUrl, createdAt } = user;

  return { email, displayName, photoUrl, createdAt };
};

const userApi = { getCurrentUser };

export default userApi;
