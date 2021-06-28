import { User } from '../../types/user.types';
import client from '../client';

export const signInGoogleAccount = async (googleToken: string) => {
  try {
    const response = await client.post('/api/auth/google/sign-in', {
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
