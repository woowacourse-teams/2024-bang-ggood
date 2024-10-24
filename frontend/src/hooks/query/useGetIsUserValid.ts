import { useQuery } from '@tanstack/react-query';

import { getIsUserValid } from '@/apis/user';
import { QUERY_KEYS } from '@/constants/queryKeys';

const useGetIsUserValidQuery = () => {
  return useQuery<Awaited<ReturnType<typeof getIsUserValid>>>({
    queryKey: [QUERY_KEYS.AUTH, QUERY_KEYS.IS_USER_VALID],
    queryFn: getIsUserValid,
  });
};

export default useGetIsUserValidQuery;
