import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import { User } from '@/types/user';

export const postLogin = async (code: string) => {
  const response = await fetcher.post({ url: BASE_URL + ENDPOINT.LOGIN, body: { code } });
  return response;
};

export const postLogout = async () => {
  const response = await fetcher.post({ url: BASE_URL + ENDPOINT.LOGOUT });
  return response;
};

export const getUserInfo = async () => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.USER_INFO });
  const data = await response.json();
  return data as User;
};
