import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';

export const postKakaoCode = async (code: string) => {
  const response = await fetcher.post({ url: BASE_URL + ENDPOINT.OAUTH, body: { code } });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response;
};
