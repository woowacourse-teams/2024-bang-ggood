import { useMutation } from '@tanstack/react-query';

import { postLogin } from '@/apis/user';

const useAddUserQuery = () => {
  return useMutation({
    mutationFn: (code: string) => postLogin(code),
  });
};

export default useAddUserQuery;
