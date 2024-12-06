import { useMutation } from '@tanstack/react-query';

import { postSignUp } from '@/apis/user';

const usePostSignUpQuery = () => {
  return useMutation({ mutationFn: postSignUp });
};

export default usePostSignUpQuery;
