import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants/routePath';
import useGaTracker from '@/hooks/useGaTracker';

const isAuthenticated = () => {
  localStorage.setItem('isLogin', 'true');
  return localStorage.getItem('isLogin') !== null;
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
