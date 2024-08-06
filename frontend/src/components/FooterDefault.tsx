import Footer from '@/components/_common/Footer/Footer';
import { ROUTE_PATH } from '@/constants/routePath';

const FooterDefault = () => {
  return (
    <Footer>
      {[
        { node: <Footer.HomeLogo />, nodeActive: <Footer.HomeLogoActive />, path: ROUTE_PATH.root },
        { node: <Footer.LocationLogo />, nodeActive: <Footer.LocationLogoActive />, path: ROUTE_PATH.location },
        { node: <Footer.ChecklistLogo />, nodeActive: <Footer.ChecklistLogoActive />, path: ROUTE_PATH.checklistList },
        { node: <Footer.MyPageLogo />, nodeActive: <Footer.MyPageLogoActive />, path: ROUTE_PATH.myPage },
      ]}
    </Footer>
  );
};

export default FooterDefault;
