import { useQuery } from '@tanstack/react-query';

import { getChecklistQuestions } from '@/apis/checklist';
import { QUERY_KEYS } from '@/constants/queryKeys';

const useGetChecklistQuestionQuery = () => {
  return useQuery({ queryKey: [QUERY_KEYS.CHECKLIST_QUESTIONS], queryFn: getChecklistQuestions });
};

export default useGetChecklistQuestionQuery;
