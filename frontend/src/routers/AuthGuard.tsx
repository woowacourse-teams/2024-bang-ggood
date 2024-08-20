import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants/routePath';
import useUserQuery from '@/hooks/query/useUserQuery';

const AuthGuard = () => {
  const navigate = useNavigate();
  const { isError } = useUserQuery();

  useEffect(() => {
    if (isError) {
      navigate(ROUTE_PATH.landing);
    }
  }, [navigate, isError]);

  return <Outlet />;
};

export default AuthGuard;
