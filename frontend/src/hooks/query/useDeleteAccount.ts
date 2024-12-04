import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { deleteAccount } from '@/apis/user';
import { ROUTE_PATH } from '@/constants/routePath';
import useUserStore from '@/store/useUserStore';

const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const { reset } = useUserStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.clear();
      reset();
      navigate(ROUTE_PATH.root);
    },
  });
};

export default useDeleteAccount;
