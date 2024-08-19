import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { STORAGE_KEYS } from '@/constants/localStorage';
import { ROUTE_PATH } from '@/constants/routePath';
import useGaTracker from '@/hooks/useGaTracker';

const isAuthenticated = () => {
  return localStorage.getItem(STORAGE_KEYS.LOGIN) !== null;
};

const RootLayout = () => {
  const navigate = useNavigate();
  useGaTracker();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate(ROUTE_PATH.login);
    }
  }, [navigate]);

  return <Outlet />;
};

export default RootLayout;
