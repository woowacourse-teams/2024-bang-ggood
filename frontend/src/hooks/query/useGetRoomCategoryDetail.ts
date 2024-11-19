import { useQuery } from '@tanstack/react-query';

import { getRoomCategoryDetail } from '@/apis/room';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { STALE_TIME } from '@/constants/system';
import { ChecklistCompare } from '@/types/checklistCompare';

const useGetRoomCategoryDetailQuery = ({ roomId, categoryId }: { roomId: number; categoryId: number }) => {
  return useQuery<ChecklistCompare[]>({
    queryKey: [QUERY_KEYS.ROOM_CATEGORY_DETAIL, roomId, categoryId],
    queryFn: async () => await getRoomCategoryDetail({ roomId, categoryId }),
    staleTime: STALE_TIME,
  });
};

export default useGetRoomCategoryDetailQuery;
