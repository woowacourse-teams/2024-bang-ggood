import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { getUserInfo, postSignIn } from '@/apis/user';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ROUTE_PATH } from '@/constants/routePath';
import useToast from '@/hooks/useToast';
import amplitudeInitializer from '@/service/amplitude/amplitudeInitializer';

const usePostSignInQuery = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { init } = amplitudeInitializer();
  const { showToast } = useToast();

  queryClient.setMutationDefaults(['auth', 'sign-in'], { onError: undefined });
  return useMutation({
    mutationKey: ['auth', 'sign-in'],
    mutationFn: postSignIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AUTH] });

      const initUser = async () => {
        // 유저 정보 가져오기
        const user = await queryClient.fetchQuery({
          queryKey: [QUERY_KEYS.USER],
          queryFn: getUserInfo,
        });
        queryClient.setQueryData([QUERY_KEYS.USER], user);

        init(user.userEmail);
        showToast({ message: `${user?.userName}님, 환영합니다.`, type: 'confirm' });
      };

      initUser();
      navigate(ROUTE_PATH.home);
    },
  });
};

export default usePostSignInQuery;
