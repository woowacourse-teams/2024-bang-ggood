import { useQuery } from '@tanstack/react-query';

import { getArticle } from '@/apis/article';
import { QUERY_KEYS } from '@/constants/queryKeys';

const useGetArticleQuery = (articleId: string) => {
  return useQuery({ queryKey: [QUERY_KEYS.ARTICLE, articleId], queryFn: () => getArticle(Number(articleId)) });
};

export default useGetArticleQuery;
