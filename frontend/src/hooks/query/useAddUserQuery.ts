import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postLogin } from '@/apis/user';
import { QUERY_KEYS } from '@/constants/queryKeys';

interface MutationVariables {
  code: string;
  redirectUri: string;
}

const useAddUserQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ code, redirectUri }: MutationVariables) => postLogin(code, redirectUri),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AUTH] });
    },
  });
};

export default useAddUserQuery;
