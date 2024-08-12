import { useMutation } from '@tanstack/react-query';

import { deleteLike, postLike } from '@/apis/like';
import useRefetchGetChecklistList from '@/hooks/query/useRefetchGetChecklistList';

const useToggleLikeQuery = () => {
  const { invalidateChecklistListQuery } = useRefetchGetChecklistList();

  return useMutation({
    mutationFn: async ({ checklistId, isLiked }: { checklistId: number; isLiked: boolean }) => {
      if (isLiked) {
        return deleteLike(checklistId);
      } else {
        return postLike(checklistId);
      }
    },
    onSuccess: () => {
      invalidateChecklistListQuery();
    },
    onError: error => {
      console.error('Error toggling like status:', error);
    },
  });
};

export default useToggleLikeQuery;
