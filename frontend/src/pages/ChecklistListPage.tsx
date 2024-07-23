import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import mockChecklistList from '@/_mock/checklistList.json';
import ChecklistPreviewCard from '@/components/ChecklistList/ChecklistPreviewCard';
import CompareBanner from '@/components/ChecklistList/CompareBanner';
import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/Header';
import Layout from '@/components/common/layout/Layout';
import { flexColumn } from '@/styles/common';

const ChecklistListPage = () => {
  const checklistList = mockChecklistList;

  return (
    <>
      <Header center={<Header.Text>체크리스트</Header.Text>} />
      <CompareBanner />
      <Layout>
        <S.ListBox>
          {checklistList.map(checklist => (
            <>
              <Link to={`checklist/${checklist.checklistId}`}>
                <ChecklistPreviewCard key={checklist.checklistId} checklist={checklist} />
              </Link>
            </>
          ))}
        </S.ListBox>
      </Layout>
      <Footer>
        {[
          { node: <Footer.HomeLogo />, nodeActive: <Footer.HomeLogoActive />, path: 'home' },
          { node: <Footer.LocationLogo />, nodeActive: <Footer.LocationLogoActive />, path: 'location' },
          { node: <Footer.ChecklistLogo />, nodeActive: <Footer.ChecklistLogoActive />, path: 'checklist' },
          { node: <Footer.MyPageLogo />, nodeActive: <Footer.MyPageLogoActive />, path: 'my-page' },
        ]}
      </Footer>
    </>
  );
};

export default ChecklistListPage;

const S = {
  ListBox: styled.div`
    ${flexColumn}
    gap: 8px;
  `,
};
