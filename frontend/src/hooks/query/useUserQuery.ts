import { useQuery } from '@tanstack/react-query';

import { getUserInfo } from '@/apis/user';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { User } from '@/types/user';

const useUserQuery = () => {
  return useQuery<User>({
    queryKey: [QUERY_KEYS.AUTH, QUERY_KEYS.USER],
    queryFn: getUserInfo,
    retry: false,
  });
};

export default useUserQuery;
