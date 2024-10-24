import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { deleteAccount } from '@/apis/user';
import { ROUTE_PATH } from '@/constants/routePath';

const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.clear();
      navigate(ROUTE_PATH.root);
    },
  });
};

export default useDeleteAccount;
