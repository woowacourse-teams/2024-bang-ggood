import { useQuery } from '@tanstack/react-query';

import { getBuildingList } from '@/apis/building';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { PaginationParams } from '@/types/api';

export const useGetBuildingListQuery = (
  searchParams: { search?: string; subways?: string[] } = {},
  pageParams: PaginationParams = { page: 1, size: 20 },
) => {
  const subways = searchParams.subways?.join(',');
  return useQuery({
    queryKey: [QUERY_KEYS.BUILDING_LIST, searchParams, pageParams],
    queryFn: () => getBuildingList({ ...searchParams, subways }, pageParams),
  });
};
