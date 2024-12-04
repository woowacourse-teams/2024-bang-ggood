import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { getUserInfo, postSignIn } from '@/apis/user';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ROUTE_PATH } from '@/constants/routePath';
import useToast from '@/hooks/useToast';
import amplitudeInitializer from '@/service/amplitude/amplitudeInitializer';
import useUserStore from '@/store/useUserStore';

const usePostSignInQuery = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, setUser } = useUserStore();
  const { init } = amplitudeInitializer();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: postSignIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AUTH] });

      const initUser = async () => {
        const result = await getUserInfo();
        setUser(result);

        init(user.userEmail);
        showToast({ message: `${user?.userName}님, 환영합니다.`, type: 'confirm' });
      };

      initUser();
      navigate(ROUTE_PATH.home);
    },
  });
};

export default usePostSignInQuery;
