import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { postLogout } from '@/apis/user';
import { ROUTE_PATH } from '@/constants/routePath';

const useLogoutQuery = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.clear();
      navigate(ROUTE_PATH.root);
    },
  });
};

export default useLogoutQuery;
