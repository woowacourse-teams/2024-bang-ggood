import { useMutation } from '@tanstack/react-query';

import { postResetPasswordCode } from '@/apis/user';

const usePostResetPasswordCode = () => {
  return useMutation({ mutationFn: postResetPasswordCode });
};

export default usePostResetPasswordCode;
