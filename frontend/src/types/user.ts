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

export type Email = `${string}@${string}.${string}`;
export interface ResetPasswordArgs {
  email: Email;
  code: string;
  newPassword: string;
}
