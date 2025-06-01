import { useSuspenseQuery } from '@tanstack/react-query';

import { getArticleList } from '@/apis/article';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { STALE_TIME } from '@/constants/system';
import { Article } from '@/types/article';

const useGetArticleListQuery = () => {
  const { data } = useSuspenseQuery<Article[]>({
    queryKey: [QUERY_KEYS.ARTICLE_LIST],
    queryFn: getArticleList,
    staleTime: STALE_TIME,
  });

  return { articles: data };
};

export default useGetArticleListQuery;
