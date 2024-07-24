import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getChecklists } from '@/apis/checklist';
import { Plus } from '@/assets/assets';
import ChecklistPreviewCard from '@/components/ChecklistList/ChecklistPreviewCard';
import CompareBanner from '@/components/ChecklistList/CompareBanner';
import FloatingButton from '@/components/common/Button/FloatingButton';
import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/Header';
import Layout from '@/components/common/layout/Layout';
import { flexColumn } from '@/styles/common';
import { ChecklistPreview } from '@/types/checklist';

const ChecklistListPage = () => {
  const [checklistList, setChecklistList] = useState<ChecklistPreview[]>([]);

  useEffect(() => {
    const fetchChecklist = async () => {
      const checklistList = await getChecklists();
      setChecklistList(checklistList);
    };
    fetchChecklist();
  }, []);

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
      <Link to="/new-checklist">
        <FloatingButton>
          <Plus />
        </FloatingButton>
      </Link>
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
