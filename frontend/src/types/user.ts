export type UserType = 'ADMIN' | 'USER' | 'GUEST';

export interface User {
  userId: number;
  userName: string;
  userEmail: string;
  userType: UserType;
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
