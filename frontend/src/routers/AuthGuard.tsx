import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants/routePath';
import useGetUserQuery from '@/hooks/query/useGetUserQuery';

const AuthGuard = () => {
  const navigate = useNavigate();
  const { isError } = useGetUserQuery();

  useEffect(() => {
    if (isError) {
      navigate(ROUTE_PATH.root);
    }
  }, [navigate, isError]);

  return <Outlet />;
};

export default AuthGuard;
