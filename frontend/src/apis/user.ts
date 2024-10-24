import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import { User, UserTokenValid } from '@/types/user';

export const postOAuthLogin = async (code: string, redirectUri: string) => {
  const response = await fetcher.post({ url: BASE_URL + ENDPOINT.OAUTH_LOGIN, body: { code, redirectUri } });
  return response;
};

export const postLogout = async () => {
  const response = await fetcher.post({ url: BASE_URL + ENDPOINT.LOGOUT_V1 });
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

export const deleteAccount = async () => {
  const response = await fetcher.delete({ url: BASE_URL + ENDPOINT.DELETE_ACCOUNT });
  return response;
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

export const postSignUp = async ({ name, email, password }: { name: string; email: string; password: string }) => {
  return await fetch(`${BASE_URL}${ENDPOINT.REGISTER}`, {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
};

export const postSignIn = async ({ email, password }: { email: string; password: string }) => {
  return await fetcher.post({
    url: `${BASE_URL}${ENDPOINT.SIGN_IN}`,
    body: { email, password },
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
};
