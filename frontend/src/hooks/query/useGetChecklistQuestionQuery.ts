import { useQuery } from '@tanstack/react-query';

import { getChecklistQuestions } from '@/apis/checklist';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ChecklistCategoryQuestions } from '@/types/checklist';

const useGetChecklistQuestionQuery = () => {
  return useQuery<ChecklistCategoryQuestions[]>({
    queryKey: [QUERY_KEYS.CHECKLIST_QUESTIONS],
    queryFn: getChecklistQuestions,
  });
};

export default useGetChecklistQuestionQuery;
