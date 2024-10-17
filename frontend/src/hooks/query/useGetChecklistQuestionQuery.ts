import { useQuery } from '@tanstack/react-query';

import { getChecklistQuestions } from '@/apis/checklist';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ChecklistCategory } from '@/types/checklist';

const useGetChecklistQuestionQuery = () => {
  return useQuery<ChecklistCategory[]>({
    queryKey: [QUERY_KEYS.CHECKLIST_QUESTIONS],
    queryFn: getChecklistQuestions,
  });
};

export default useGetChecklistQuestionQuery;
