import { useQuery } from '@tanstack/react-query';

import { getChecklistAllQuestions } from '@/apis/checklist';
import { QUERY_KEYS } from '@/constants/queryKeys';

const useGetAllChecklistQuestionQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CHECKLIST_ALL_QUESTIONS],
    queryFn: getChecklistAllQuestions,
  });
};

export default useGetAllChecklistQuestionQuery;
