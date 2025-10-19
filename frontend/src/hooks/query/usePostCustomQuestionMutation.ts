import { useMutation } from '@tanstack/react-query';

import fetcher from '@/apis/fetcher';
import { BASE_URL } from '@/apis/url';
import { queryClient } from '@/App';
import { QUERY_KEYS } from '@/constants/queryKeys';

export interface RequestParamPostCustomQuestion {
  categoryId: number;
  title: string;
  subtitle?: string;
}
const postCustomQuestion = (question: RequestParamPostCustomQuestion) => {
  return fetcher.post({
    url: `${BASE_URL}/questions`,
    body: question,
  });
};

const usePostCustomQuestionMutation = () => {
  return useMutation({
    mutationFn: postCustomQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHECKLIST_ALL_QUESTIONS] });
    },
  });
};

export default usePostCustomQuestionMutation;
