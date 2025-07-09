import { putChecklist } from '@/apis/checklist';
import useRefetchGetChecklistList from '@/hooks/query/useRefetchGetChecklistList';
import { useMutation } from '@tanstack/react-query';

const usePutChecklistQuery = () => {
  const { invalidateChecklistListQuery } = useRefetchGetChecklistList();

  return useMutation({
    mutationFn: ({ formData, id }: { formData: FormData; id: number }) => putChecklist(formData, id),
    onSuccess: () => {
      invalidateChecklistListQuery();
    },
  });
};

export default usePutChecklistQuery;
