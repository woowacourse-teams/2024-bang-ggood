import { useQuery } from '@tanstack/react-query';

import { getBuildingList } from '@/apis/building';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useGetBuildingListQuery = () =>
  useQuery({ queryKey: [QUERY_KEYS.BUILDING_LIST], queryFn: getBuildingList });
