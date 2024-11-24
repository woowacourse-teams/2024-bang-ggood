import { useMutation } from '@tanstack/react-query';

import { postArticle } from '@/apis/article';

const usePostArticleQuery = () => {
  return useMutation({ mutationFn: postArticle });
};

export default usePostArticleQuery;
