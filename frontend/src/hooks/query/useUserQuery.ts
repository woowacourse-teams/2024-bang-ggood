import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getUserInfo } from '@/apis/user';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { User } from '@/types/user';

const useUserQuery = () => {
  const userQuery = useQuery<User>({
    queryKey: [QUERY_KEYS.AUTH, QUERY_KEYS.USER],
    queryFn: getUserInfo,
    retry: false,
  });

  useEffect(() => {
    if (userQuery.isSuccess && userQuery.data) {
    }
  }, [userQuery.isSuccess, userQuery.data]);

  return userQuery;
};

export default useUserQuery;
