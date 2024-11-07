export interface User {
  userId: number;
  userName: string;
  userEmail: string;
  createdAt: string;
}

export interface UserTokenValid {
  isAccessTokenExist: boolean;
  isRefreshTokenExist: boolean;
}

export interface ResetPasswordArgs {
  email: string;
  code: string;
  newPassword: string;
}
