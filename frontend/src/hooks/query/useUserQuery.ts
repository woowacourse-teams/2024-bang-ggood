import { useQuery } from '@tanstack/react-query';

import { getUserInfo } from '@/apis/login';

const useUserQuery = () => {
  return useQuery({ queryKey: [], queryFn: getUserInfo });
};

export default useUserQuery;
