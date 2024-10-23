import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import { Position } from '@/types/address';

export const getNearSubways = async (position: Position) => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.SUBWAY(position) });
  const data = await response.json();
  return data;
};
