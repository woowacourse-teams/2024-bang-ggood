import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteLike, postLike } from '@/apis/like';
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
      showToast({ message: '좋아요를 처리하는 중 문제가 발생했습니다. 나중에 다시 시도해주세요.', type: 'error' });
      invalidateChecklistListQuery();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHECKLIST] });
    },
  });
};

export default useToggleLikeQuery;
