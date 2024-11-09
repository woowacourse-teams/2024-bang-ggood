import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserInfo } from '@/apis/user';
import { KAKAO_AUTH_URL } from '@/constants/oAuth';
import { ROUTE_PATH } from '@/constants/routePath';
import useAddOAuthUserQuery from '@/hooks/query/useAddOAuthUserQuery';
import useMutateChecklist from '@/hooks/useMutateChecklist';
import useToast from '@/hooks/useToast';
import amplitudeInitializer from '@/service/amplitude/amplitudeInitializer';

const useOAuthLogin = () => {
  const navigate = useNavigate();
  const { mutate: addOAuthUser, isSuccess } = useAddOAuthUserQuery();
  const { handleSubmitChecklist } = useMutateChecklist('add');
  const { init } = amplitudeInitializer();
  const { showToast } = useToast();

  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.delete('code');
  const redirectUri = currentUrl.toString();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      addOAuthUser({ code, redirectUri });
    }
  }, [addOAuthUser]);

  useEffect(() => {
    const initAmplitudeUser = async () => {
      const result = await getUserInfo();
      init(result.userEmail);
      showToast({ message: `${result?.userName}님, 환영합니다.`, type: 'confirm' });
    };

    if (isSuccess) {
      initAmplitudeUser();
      if (redirectUri.includes(ROUTE_PATH.checklistNew)) return handleSubmitChecklist();
      else return navigate(ROUTE_PATH.home);
    }
  }, [isSuccess, navigate]);

  const moveToKakao = () => {
    window.location.href = KAKAO_AUTH_URL(redirectUri);
  };

  return { moveToKakao };
};

export default useOAuthLogin;
