import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { KAKAO_AUTH_URL } from '@/constants/oAuth';
import { ROUTE_PATH } from '@/constants/routePath';
import useAddUserQuery from '@/hooks/query/useAddUserQuery';
import useMutateChecklist from '@/hooks/useMutateChecklist';

const useLogin = () => {
  const navigate = useNavigate();
  const { mutate: addUser, isSuccess } = useAddUserQuery();
  const { handleSubmitChecklist } = useMutateChecklist('add');

  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.delete('code');
  const redirectUri = currentUrl.toString();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      addUser({ code, redirectUri });
    }
  }, [addUser]);

  useEffect(() => {
    if (isSuccess) {
      if (redirectUri.includes('/checklist/new')) return handleSubmitChecklist();
      else return navigate(ROUTE_PATH.home);
    }
  }, [isSuccess, navigate]);

  const moveToKakao = () => {
    window.location.href = KAKAO_AUTH_URL(redirectUri);
  };

  return { moveToKakao };
};

export default useLogin;
