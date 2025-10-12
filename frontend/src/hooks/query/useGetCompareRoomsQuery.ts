import { useQuery } from '@tanstack/react-query';

import { getRoomCompare } from '@/apis/room';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { STALE_TIME } from '@/constants/system';

const useGetCompareRoomsQuery = (roomId1: number, roomId2: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ROOM_COMPARE, roomId1, roomId2],
    queryFn: async () => await getRoomCompare(roomId1, roomId2),
    staleTime: STALE_TIME,
  });
};

export default useGetCompareRoomsQuery;
