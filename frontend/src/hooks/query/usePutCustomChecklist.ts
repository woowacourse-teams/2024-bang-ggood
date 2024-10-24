import { useMutation, useQueryClient } from '@tanstack/react-query';

import { putCustomChecklist } from '@/apis/checklist';
import { QUERY_KEYS } from '@/constants/queryKeys';

const usePutCustomChecklist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (questionIds: number[]) => putCustomChecklist({ questionIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHECKLIST_QUESTIONS] });
    },
  });
};

export default usePutCustomChecklist;
