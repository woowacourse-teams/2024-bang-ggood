import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAddUserQuery from '@/hooks/query/useAddUserQuery';
import useMutateChecklist from '@/hooks/useMutateChecklist';

const useLogin = () => {
  const navigate = useNavigate();
  const { mutate: addUser, isSuccess } = useAddUserQuery();
  const { handleSubmitChecklist } = useMutateChecklist('add');

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      addUser(code);
    }
  }, [addUser]);

  useEffect(() => {
    if (isSuccess) {
      const afterLoginPath = localStorage.getItem('afterLoginPath') || '/';
      if (afterLoginPath === '/checklist') handleSubmitChecklist();
      navigate(afterLoginPath);
    }
  }, [isSuccess, navigate]);
};

export default useLogin;
