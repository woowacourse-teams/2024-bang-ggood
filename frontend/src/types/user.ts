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
