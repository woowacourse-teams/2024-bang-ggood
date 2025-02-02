import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getUserInfo, postOAuthLogin } from '@/apis/user';
import { QUERY_KEYS } from '@/constants/queryKeys';
import useToast from '@/hooks/useToast';
import amplitudeInitializer from '@/service/amplitude/amplitudeInitializer';

interface MutationVariables {
  code: string;
  redirectUri: string;
}

const useAddOAuthUserQuery = () => {
  const queryClient = useQueryClient();
  const { init } = amplitudeInitializer();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ code, redirectUri }: MutationVariables) => postOAuthLogin(code, redirectUri),
    onSuccess: () => {
      // 로그인 성공 후 유저 정보 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AUTH] });

      const initUser = async () => {
        // 유저 정보 가져오기
        const result = await queryClient.fetchQuery({
          queryKey: [QUERY_KEYS.USER],
          queryFn: getUserInfo,
        });

        // Amplitude 초기화 및 환영 메시지 표시
        init(result.userEmail);
        showToast({ message: `${result?.userName}님, 환영합니다.`, type: 'confirm' });
      };

      initUser();
    },
  });
};

export default useAddOAuthUserQuery;
