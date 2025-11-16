import { useSuspenseQuery } from '@tanstack/react-query';

import { getArticleList } from '@/apis/article';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { STALE_TIME } from '@/constants/system';

export const useGetArticleListSuspenseQuery = () => {
  const { data } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.ARTICLE_LIST],
    queryFn: getArticleList,
    staleTime: STALE_TIME,
  });

  return { articles: data };
};
