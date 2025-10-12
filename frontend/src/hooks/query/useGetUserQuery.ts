import { useQuery } from '@tanstack/react-query';

import { getUserInfo } from '@/apis/user';
import { QUERY_KEYS } from '@/constants/queryKeys';

const useGetUserQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.AUTH, QUERY_KEYS.USER],
    queryFn: getUserInfo,
    retry: false,
  });
};

export default useGetUserQuery;
