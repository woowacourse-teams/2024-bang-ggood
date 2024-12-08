import { useMutation } from '@tanstack/react-query';

import { postSignUp } from '@/apis/user';
import useToast from '@/hooks/useToast';

const usePostSignUpQuery = () => {
  const { showToast } = useToast();
  return useMutation({
    mutationFn: postSignUp,
    onSuccess: () => {
      showToast({ message: '회원가입이 완료되었습니다.', type: 'confirm' });
    },
  });
};

export default usePostSignUpQuery;
