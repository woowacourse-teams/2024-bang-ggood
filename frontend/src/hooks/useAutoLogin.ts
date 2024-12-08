import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteToken, getIsUserValid, postReissueAccessToken } from '@/apis/user';
import { ROUTE_PATH } from '@/constants/routePath';

const useAutoLogin = () => {
  const navigate = useNavigate();

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
    return navigate(ROUTE_PATH.home);
  };

  useEffect(() => {
    fetchIsUserValid();
  }, []);
};

export default useAutoLogin;
