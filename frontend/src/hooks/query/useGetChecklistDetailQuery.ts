import { useQuery } from '@tanstack/react-query';

import { getChecklistDetail } from '@/apis/checklist';
import { QUERY_KEYS } from '@/constants/queryKeys';

const useGetChecklistDetailQuery = (checklistId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CHECKLIST, checklistId],
    queryFn: () => getChecklistDetail(Number(checklistId)),
  });
};

export default useGetChecklistDetailQuery;
