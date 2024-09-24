import { useMutation } from '@tanstack/react-query';

import { putCustomChecklist } from '@/apis/checklist';

const usePutCustomChecklist = () => {
  return useMutation({
    mutationFn: (questionIds: number[]) => putCustomChecklist({ questionIds }),
  });
};

export default usePutCustomChecklist;
