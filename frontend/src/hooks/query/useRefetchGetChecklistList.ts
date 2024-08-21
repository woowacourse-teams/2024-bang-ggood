import { useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useRefetchGetChecklistList = () => {
  const queryClient = useQueryClient();

  const invalidateChecklistListQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHECKLIST_LIST] });
  };

  return {
    invalidateChecklistListQuery,
  };
};

export default useRefetchGetChecklistList;
