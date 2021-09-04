export type User = {
  createdAt: Date;
  email: string;
  displayName: string;
  photoUrl?: string;
};

export type GetUserProfileResponseData = {
  user: User;
};

export type CheckSocialAccountResponseData = {
  isExists: boolean;
};

export type SignInSocialAccountResponseData = GetUserProfileResponseData & {
  accessToken: string;
};
