import { Outlet } from 'react-router';

import useGaTracker from '@/hooks/useGaTracker';

const RootLayout = () => {
  useGaTracker();

  return <Outlet />;
};

export default RootLayout;
