import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';

export const postKakaoCode = async (code: string) => {
  const response = await fetcher.post({ url: BASE_URL + ENDPOINT.OAUTH, body: { code } });
  return response;
};
