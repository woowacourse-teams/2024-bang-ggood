import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAddUserQuery from '@/hooks/query/useAddUserQuery';

const useLogin = (navigate_path: string) => {
  const navigate = useNavigate();
  const { mutate: addUser, isSuccess } = useAddUserQuery();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      addUser(code);
    }
  }, [addUser]);

  useEffect(() => {
    if (isSuccess) {
      navigate(navigate_path);
    }
  }, [isSuccess, navigate]);
};

export default useLogin;
