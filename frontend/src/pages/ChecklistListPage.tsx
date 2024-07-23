import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import mockChecklistList from '@/_mock/checklistList.json';
import ChecklistPreviewCard from '@/components/ChecklistList/ChecklistPreviewCard';
import CompareBanner from '@/components/ChecklistList/CompareBanner';
import Header from '@/components/common/Header/Header';
import Layout from '@/components/common/layout/Layout';
import { flexColumn } from '@/styles/common';

const ChecklistListPage = () => {
  const checklistList = mockChecklistList;

  return (
    <>
      <Header />
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
