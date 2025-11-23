import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';
import { InfinitePaginationParams, PaginationParams } from '@/types/api';
import { BuildingDetailResponse, BuildingsResponse } from '@/types/building';

export const getBuildingList = async (
  searchParams: { search?: string; subways?: string },
  params: PaginationParams,
) => {
  const response = await fetcher.get({
    url: BASE_URL + ENDPOINT.BUILDING_LIST,
    params: { ...searchParams, ...params },
  });
  const data = await response.json();
  return data as BuildingsResponse;
};

export const getBuildingDetail = async (buildingId: number, params: InfinitePaginationParams) => {
  const response = await fetcher.get({
    url: BASE_URL + ENDPOINT.BUILDING_DETAIL(buildingId),
    params: {...params}
  });
  const data = await response.json();
  return data as BuildingDetailResponse;
};