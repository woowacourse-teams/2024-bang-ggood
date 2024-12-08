import { useMutation } from '@tanstack/react-query';

import { postResetPasswordMail } from '@/apis/user';

const usePostResetPasswordMail = () => {
  return useMutation({
    mutationFn: postResetPasswordMail,
  });
};

export default usePostResetPasswordMail;
