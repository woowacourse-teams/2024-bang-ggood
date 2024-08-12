import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { STORAGE_KEYS } from '@/constants/localStorage';
import { ROUTE_PATH } from '@/constants/routePath';
import useGaTracker from '@/hooks/useGaTracker';

const isAuthenticated = () => {
  localStorage.setItem(STORAGE_KEYS.LOGIN, 'true');
  return localStorage.getItem(STORAGE_KEYS.LOGIN) !== null;
};

const RootLayout = () => {
  const navigate = useNavigate();
  useGaTracker();

  if (!isAuthenticated()) {
    navigate(ROUTE_PATH.login);
  }

  return <Outlet />;
};

export default RootLayout;
