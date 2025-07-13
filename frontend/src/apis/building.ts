import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import { BuildingsResponse } from '@/types/building';

export const getBuildingList = async () => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.BUILDING_LIST });
  const data = await response.json();
  return data as BuildingsResponse;
};
