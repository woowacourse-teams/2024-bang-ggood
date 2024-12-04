import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getUserInfo, postOAuthLogin } from '@/apis/user';
import { QUERY_KEYS } from '@/constants/queryKeys';
import useToast from '@/hooks/useToast';
import amplitudeInitializer from '@/service/amplitude/amplitudeInitializer';
import useUserStore from '@/store/useUserStore';

interface MutationVariables {
  code: string;
  redirectUri: string;
}

const useAddOAuthUserQuery = () => {
  const queryClient = useQueryClient();
  const { user, setUser } = useUserStore();
  const { init } = amplitudeInitializer();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ code, redirectUri }: MutationVariables) => postOAuthLogin(code, redirectUri),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AUTH] });

      const initAmplitudeUser = async () => {
        const result = await getUserInfo();
        setUser(result);

        init(user.userEmail);
        showToast({ message: `${user?.userName}님, 환영합니다.`, type: 'confirm' });
      };

      initAmplitudeUser();
    },
  });
};

export default useAddOAuthUserQuery;
