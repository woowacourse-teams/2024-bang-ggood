import { useMutation } from '@tanstack/react-query';

import { postChecklist } from '@/apis/checklist';
import useRefetchGetChecklistList from '@/hooks/query/useRefetchGetChecklistList';

const useAddChecklistQuery = () => {
  const { invalidateChecklistListQuery } = useRefetchGetChecklistList();

  return useMutation({
    mutationFn: postChecklist,
    onSuccess: () => {
      invalidateChecklistListQuery();
    },
  });
};

export default useAddChecklistQuery;
