import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getIsUserValid, postReissueAccessToken } from '@/apis/user';
import { ROUTE_PATH } from '@/constants/routePath';

const useIsValidUser = () => {
  const navigate = useNavigate();

  const fetchIsUserValid = async () => {
    const { isAccessTokenExist, isRefreshTokenExist } = await getIsUserValid();

    if (isRefreshTokenExist && isAccessTokenExist) {
      return navigate(ROUTE_PATH.home);
      //TODO: 00님 환영합니다. 또는 자동 로그인 되었습니다. 토스트 띄워주기
    }
    if (isRefreshTokenExist && !isAccessTokenExist) {
      const accessTokenReissueResult = await postReissueAccessToken();
      if (accessTokenReissueResult.status === 201) {
        return navigate(ROUTE_PATH.home);
      }
    }
    //TODO: access 재발급 요청
  };

  useEffect(() => {
    fetchIsUserValid();
  }, []);

  return null;
};

export default useIsValidUser;
