import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import { PaginationParams } from '@/types/api';
import { BuildingsResponse } from '@/types/building';

export const getBuildingList = async (searchParams: { search?: string }, params: PaginationParams) => {
  const response = await fetcher.get({
    url: BASE_URL + ENDPOINT.BUILDING_LIST,
    params: { ...searchParams, ...params },
  });
  const data = await response.json();
  return data as BuildingsResponse;
};
