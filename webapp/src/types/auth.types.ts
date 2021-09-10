export type User = {
  createdAt: Date;
  email: string;
  displayName: string;
  photoUrl?: string;
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
