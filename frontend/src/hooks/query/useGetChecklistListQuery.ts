import { useQuery } from '@tanstack/react-query';

import { getChecklists } from '@/apis/checklist';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { STALE_TIME } from '@/constants/system';
import { ChecklistPreview } from '@/types/checklist';

const useGetChecklistListQuery = (isLikeFiltered: boolean = false) => {
  return useQuery<ChecklistPreview[]>({
    queryKey: [QUERY_KEYS.CHECKLIST_LIST, isLikeFiltered],
    queryFn: async () => await getChecklists(isLikeFiltered),
    staleTime: STALE_TIME,
  });
};

export default useGetChecklistListQuery;
