import { useQuery } from '@tanstack/react-query';

import { getArticle } from '@/apis/article';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { Article } from '@/types/article';

const useGetArticleQuery = (articleId: string) => {
  return useQuery<Article>({ queryKey: [QUERY_KEYS.ARTICLE, articleId], queryFn: () => getArticle(Number(articleId)) });
};

export default useGetArticleQuery;
