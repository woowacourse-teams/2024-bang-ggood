import { useQuery } from '@tanstack/react-query';

import { getBuildingDetail } from '@/apis/building';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { InfinitePaginationParams } from '@/types/api';

export const useGetBuildingDetailQuery = (
  buildingId: number,
  params: InfinitePaginationParams,
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BUILDING_DETAIL, buildingId, params],
    queryFn: () => getBuildingDetail(buildingId, params),
  });
};
