import { useMutation } from '@tanstack/react-query';

import { postLogout } from '@/apis/user';

const useLogoutQuery = () => {
  return useMutation({
    mutationFn: postLogout,
  });
};

export default useLogoutQuery;
