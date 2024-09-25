import { useMutation } from '@tanstack/react-query';

import { putChecklist } from '@/apis/checklist';
import useRefetchGetChecklistList from '@/hooks/query/useRefetchGetChecklistList';
import { ChecklistPostForm } from '@/types/checklist';

const usePutChecklistQuery = () => {
  const { invalidateChecklistListQuery } = useRefetchGetChecklistList();

  return useMutation({
    mutationFn: (data: { id: number; checklist: ChecklistPostForm }) => putChecklist(data.id, data.checklist),
    onSuccess: () => {
      invalidateChecklistListQuery();
    },
  });
};

export default usePutChecklistQuery;
