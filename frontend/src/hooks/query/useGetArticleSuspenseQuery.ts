import { useSuspenseQuery } from '@tanstack/react-query';

import { getArticle } from '@/apis/article';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { Article } from '@/types/article';

export const useGetArticleSuspenseQuery = (articleId: string) => {
  const { data } = useSuspenseQuery<Article>({
    queryKey: [QUERY_KEYS.ARTICLE, articleId],
    queryFn: () => getArticle(Number(articleId)),
  });

  return { article: data };
};
