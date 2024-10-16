import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteToken, getIsUserValid, getUserInfo, postReissueAccessToken } from '@/apis/user';
import { ROUTE_PATH } from '@/constants/routePath';
import useToast from '@/hooks/useToast';

const useAutoLogin = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const fetchIsUserValid = async () => {
    const { isAccessTokenExist, isRefreshTokenExist } = await getIsUserValid();
    if (isRefreshTokenExist) {
      if (!isAccessTokenExist) {
        try {
          const accessTokenReissueResult = await postReissueAccessToken();
          if (accessTokenReissueResult?.status !== 200) return;
        } catch (err) {
          return await deleteToken();
        }
      }

      const result = await getUserInfo();
      showToast({ message: `${result?.userName}님, 환영합니다.`, type: 'confirm' });
      return navigate(ROUTE_PATH.home);
    }
  };

  useEffect(() => {
    fetchIsUserValid();
  }, []);
};

export default useAutoLogin;
