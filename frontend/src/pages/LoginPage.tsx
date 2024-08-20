import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { postKakaoCode } from '@/apis/login';
import { KAKAO_AUTH_URL } from '@/constants/oAuth';
import { ROUTE_PATH } from '@/constants/routePath';

export const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    const postLogin = async () => {
      if (code) {
        await postKakaoCode(code).then(async () => {
          navigate(ROUTE_PATH.home);
        });
      }
    };

    if (code) {
      postLogin();
    } else {
      handleLogin();
    }
  }, []);

  const handleLogin = async () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div>
      <button>카카오</button>
    </div>
  );
};

export default LoginPage;
