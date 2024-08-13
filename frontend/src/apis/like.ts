import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';

export const postLike = async (id: number) => {
  const response = await fetcher.post({ url: BASE_URL + ENDPOINT.LIKE(id) });
  return response;
};

export const deleteLike = async (id: number) => {
  const response = await fetcher.delete({ url: BASE_URL + ENDPOINT.LIKE(id) });
  return response;
};
