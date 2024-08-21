import { Outlet } from 'react-router-dom';

import FooterDefault from '@/components/_common/Footer/FooterDefault';

const FooterLayout = () => {
  return (
    <>
      <Outlet />
      <FooterDefault />
    </>
  );
};

export default FooterLayout;
