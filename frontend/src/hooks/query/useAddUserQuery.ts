import { useMutation } from '@tanstack/react-query';

import { postLogin } from '@/apis/user';

interface MutationVariables {
  code: string;
  redirectUri: string;
}

const useAddUserQuery = () => {
  return useMutation({
    mutationFn: ({ code, redirectUri }: MutationVariables) => postLogin(code, redirectUri),
  });
};

export default useAddUserQuery;
