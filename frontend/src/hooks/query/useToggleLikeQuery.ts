import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteLike, postLike } from '@/apis/like';
import { TOAST_MESSAGE } from '@/constants/message';
import { QUERY_KEYS } from '@/constants/queryKeys';
import useRefetchGetChecklistList from '@/hooks/query/useRefetchGetChecklistList';
import useToast from '@/hooks/useToast';

const useToggleLikeQuery = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { invalidateChecklistListQuery } = useRefetchGetChecklistList();

  return useMutation({
    mutationFn: async ({ checklistId, isLiked }: { checklistId: number; isLiked: boolean }) => {
      isLiked ? postLike(checklistId) : deleteLike(checklistId);
    },
    retry: 3,
    onSuccess: () => {
      invalidateChecklistListQuery();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHECKLIST] });
    },
    onError: () => {
      showToast({ message: TOAST_MESSAGE.LIKE_ERROR });
      invalidateChecklistListQuery();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHECKLIST] });
    },
  });
};

export default useToggleLikeQuery;
