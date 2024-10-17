import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import { User, UserTokenValid } from '@/types/user';

export const postLogin = async (code: string, redirectUri: string) => {
  const response = await fetcher.post({ url: BASE_URL + ENDPOINT.LOGIN, body: { code, redirectUri } });
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

export const getIsUserValid = async () => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.USER_VALID });
  const data = await response.json();
  return data as UserTokenValid;
};

export const deleteToken = async () => {
  const response = await fetcher.delete({ url: BASE_URL + ENDPOINT.TOKEN });
  return response;
};

export const postReissueAccessToken = async () => {
  return await fetch(`${BASE_URL}${ENDPOINT.USER_ACCESS_TOKEN_REISSUE}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
};

export const postSignUp = async () => {
  return await fetch(`${BASE_URL}${ENDPOINT.REGISTER}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
};
