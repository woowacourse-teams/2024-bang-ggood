import { useMutation } from '@tanstack/react-query';

import { postResetPassword } from '@/apis/user';

const usePostResetPassword = () => {
  return useMutation({ mutationFn: postResetPassword });
};

export default usePostResetPassword;
