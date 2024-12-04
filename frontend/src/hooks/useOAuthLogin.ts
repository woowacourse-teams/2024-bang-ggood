import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { KAKAO_AUTH_URL } from '@/constants/oAuth';
import { ROUTE_PATH } from '@/constants/routePath';
import useAddOAuthUserQuery from '@/hooks/query/useAddOAuthUserQuery';
import useMutateChecklist from '@/hooks/useMutateChecklist';

const useOAuthLogin = () => {
  const navigate = useNavigate();
  const { mutate: addOAuthUser, isSuccess } = useAddOAuthUserQuery();
  const { handleSubmitChecklist } = useMutateChecklist('add');

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
    if (isSuccess) {
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
