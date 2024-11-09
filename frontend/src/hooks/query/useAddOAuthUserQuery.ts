import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postOAuthLogin } from '@/apis/user';
import { QUERY_KEYS } from '@/constants/queryKeys';

interface MutationVariables {
  code: string;
  redirectUri: string;
}

const useAddOAuthUserQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ code, redirectUri }: MutationVariables) => postOAuthLogin(code, redirectUri),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AUTH] });
    },
  });
};

export default useAddOAuthUserQuery;
