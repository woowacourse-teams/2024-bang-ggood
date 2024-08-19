import { useQuery } from '@tanstack/react-query';

import { getArticleList } from '@/apis/article';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { STALE_TIME } from '@/constants/system';

const useGetArticleListQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.ARTICLE_LIST],
    queryFn: getArticleList,
    staleTime: STALE_TIME,
  });
};

export default useGetArticleListQuery;
