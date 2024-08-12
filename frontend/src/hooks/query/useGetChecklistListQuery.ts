import { useQuery } from '@tanstack/react-query';

import { getChecklists } from '@/apis/checklist';
import { QUERY_KEYS } from '@/constants/queryKeys';

const useGetChecklistListQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CHECKLIST_LIST],
    queryFn: getChecklists,
    staleTime: 5 * 60 * 1000,
  });
};

export default useGetChecklistListQuery;
