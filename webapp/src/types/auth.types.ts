export type User = {
  createdAt: Date;
  email: string;
  displayName: string;
  photoUrl?: string;
};

export type GetUserProfileResponseData = {
  user: User;
};

export type CheckGoogleAccountResponseData = {
  isExists: boolean;
};

export type SignInGoogleAccountResponseData = GetUserProfileResponseData & {
  accessToken: string;
};
