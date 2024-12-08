import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postSignUp } from '@/apis/user';
import useToast from '@/hooks/useToast';

const usePostSignUpQuery = () => {
  const client = useQueryClient();
  client.setMutationDefaults(['auth', 'sign-up'], { onError: undefined });
  const { showToast } = useToast();
  return useMutation({
    mutationKey: ['auth', 'sign-up'],
    mutationFn: postSignUp,
    onSuccess: () => {
      showToast({ message: '회원가입이 완료되었습니다.', type: 'confirm' });
    },
    throwOnError: false,
  });
};

export default usePostSignUpQuery;
