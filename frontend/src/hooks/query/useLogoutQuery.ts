import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { postLogout } from '@/apis/user';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ROUTE_PATH } from '@/constants/routePath';
import useUserStore from '@/store/useUserStore';

const useLogoutQuery = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { reset } = useUserStore();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AUTH] });
      queryClient.clear();
      reset();
      navigate(ROUTE_PATH.root);
    },
  });
};

export default useLogoutQuery;
