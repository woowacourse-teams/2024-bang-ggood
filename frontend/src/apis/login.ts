import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import { User } from '@/types/user';

export const postKakaoCode = async (code: string) => {
  const response = await fetcher.post({ url: BASE_URL + ENDPOINT.OAUTH, body: { code } });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response;
};

export const getUserInfo = async () => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.USER_INFO });
  const data = await response.json();
  return data as User;
};
