import { useMutation } from '@tanstack/react-query';

import fetcher from '@/apis/fetcher';
import { BASE_URL } from '@/apis/url';

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
  });
};

export default usePostCustomQuestionMutation;
