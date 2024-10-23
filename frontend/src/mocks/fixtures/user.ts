import { User, UserTokenValid } from '@/types/user';

export const user: User = {
  userId: 1,
  userName: '방끗이',
  userEmail: 'bang-ggood@gmail.com',
  createdAt: '2024-08-11T10:00:00Z',
};

export const mockUserTokenValid: UserTokenValid = {
  isAccessTokenExist: true,
  isRefreshTokenExist: true,
};
