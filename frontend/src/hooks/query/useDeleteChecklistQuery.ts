import { useMutation } from '@tanstack/react-query';

import { deleteChecklist } from '@/apis/checklist';
import useRefetchGetChecklistList from '@/hooks/query/useRefetchGetChecklistList';

const useDeleteChecklistQuery = () => {
  const { invalidateChecklistListQuery } = useRefetchGetChecklistList();

  return useMutation({
    mutationFn: deleteChecklist,
    onSuccess: () => {
      invalidateChecklistListQuery();
    },
  });
};

export default useDeleteChecklistQuery;
