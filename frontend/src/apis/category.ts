import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';

export const getCategory = async () => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.CATEGORY });
  const data = await response.json();
  return data;
};
