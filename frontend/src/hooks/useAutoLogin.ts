import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteToken, getIsUserValid, getUserInfo, postReissueAccessToken } from '@/apis/user';
import { ROUTE_PATH } from '@/constants/routePath';
import useToast from '@/hooks/useToast';
import amplitudeInitializer from '@/service/amplitude/amplitudeInitializer';

const useAutoLogin = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { init } = amplitudeInitializer();

  const fetchIsUserValid = async () => {
    const { isAccessTokenExist, isRefreshTokenExist } = await getIsUserValid();
    if (isRefreshTokenExist) {
      if (!isAccessTokenExist) {
        try {
          await postReissueAccessToken();
        } catch (err) {
          return await deleteToken();
        }
      }
      await autoLogin();
    }
  };

  const autoLogin = async () => {
    const result = await getUserInfo();
    init(result.userEmail);
    showToast({ message: `${result?.userName}님, 환영합니다.`, type: 'confirm' });
    return navigate(ROUTE_PATH.home);
  };

  useEffect(() => {
    fetchIsUserValid();
  }, []);
};

export default useAutoLogin;
