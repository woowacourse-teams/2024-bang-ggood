import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteLike, postLike } from '@/apis/like';
import { QUERY_KEYS } from '@/constants/queryKeys';
import useRefetchGetChecklistList from '@/hooks/query/useRefetchGetChecklistList';

const useToggleLikeQuery = () => {
  const queryClient = useQueryClient();
  const { invalidateChecklistListQuery } = useRefetchGetChecklistList();

  return useMutation({
    mutationFn: async ({ checklistId, isLiked }: { checklistId: number; isLiked: boolean }) => {
      if (isLiked) return postLike(checklistId);
      return deleteLike(checklistId);
    },
    onSuccess: () => {
      invalidateChecklistListQuery();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHECKLIST] });
    },
  });
};

export default useToggleLikeQuery;
