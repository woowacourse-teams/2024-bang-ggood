import { Outlet } from 'react-router-dom';

import useGaTracker from '@/hooks/useGaTracker';

const GoogleAnalytics = () => {
  useGaTracker();

  return <Outlet />;
};

export default GoogleAnalytics;
