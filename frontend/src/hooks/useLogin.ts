import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAddUserQuery from '@/hooks/query/useAddUserQuery';

const useLogin = () => {
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
      const afterLoginPath = localStorage.getItem('afterLoginPath') || '/';
      navigate(afterLoginPath);
    }
  }, [isSuccess, navigate]);
};

export default useLogin;
