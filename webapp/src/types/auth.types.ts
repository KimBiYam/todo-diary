export type User = {
  createdAt: Date;
  email: string;
  displayName: string;
  photoUrl?: string;
};

export type GoogleSignInResponse = {
  accessToken: string;
};

export type GetUserProfileResponse = {
  user: User;
};

export type CheckSocialAccountResponse = {
  isExists: boolean;
};

export type SignInSocialAccountResponse = GetUserProfileResponse & {
  accessToken: string;
};

export const deserializeUser = (user: User) => {
  const { email, displayName, photoUrl, createdAt } = user;

  return { email, displayName, photoUrl, createdAt };
};
