import { useMutation } from '@tanstack/react-query';

import { postKakaoCode } from '@/apis/login';

const useAddUserQuery = () => {
  return useMutation({
    mutationFn: (code: string) => postKakaoCode(code),
  });
};

export default useAddUserQuery;
