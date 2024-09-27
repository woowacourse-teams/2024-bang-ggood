import { useEffect } from 'react';

import { KAKAO_AUTH_URL } from '@/constants/oAuth';
import useLogin from '@/hooks/useLogin';

const LoginPage = () => {
  useLogin();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    const isAuthComplete = code;

    if (!isAuthComplete) {
      window.location.href = KAKAO_AUTH_URL;
    }
  }, []);

  return <></>;
};

export default LoginPage;
