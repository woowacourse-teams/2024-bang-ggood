import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getUserInfo } from '@/apis/user';
import { QUERY_KEYS } from '@/constants/queryKeys';
import useUserStore from '@/store/useUserStore';
import { User } from '@/types/user';

const useUserQuery = () => {
  const { setUser } = useUserStore();

  const userQuery = useQuery<User>({
    queryKey: [QUERY_KEYS.AUTH, QUERY_KEYS.USER],
    queryFn: getUserInfo,
    retry: false,
  });

  useEffect(() => {
    if (userQuery.isSuccess && userQuery.data) {
      setUser(userQuery.data);
    }
  }, [userQuery.isSuccess, userQuery.data, setUser]);

  return userQuery;
};

export default useUserQuery;
