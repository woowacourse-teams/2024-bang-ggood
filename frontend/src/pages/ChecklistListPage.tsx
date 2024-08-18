import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { PlusBlack } from '@/assets/assets';
import FloatingButton from '@/components/_common/FloatingButton/FloatingButton';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import ChecklistPreviewCard from '@/components/ChecklistList/ChecklistPreviewCard';
import CustomBanner from '@/components/ChecklistList/CustomBanner';
import NoChecklistTemplate from '@/components/ChecklistList/NoChecklistTemplate';
import SkChecklistList from '@/components/skeleton/ChecklistList/SkChecklistLst';
import { ROUTE_PATH } from '@/constants/routePath';
import useGetChecklistListQuery from '@/hooks/query/useGetChecklistListQuery';
import { flexColumn } from '@/styles/common';
import { ChecklistPreview } from '@/types/checklist';

const ChecklistListPage = () => {
  const navigate = useNavigate();
  const { data: checklistList, isLoading, error } = useGetChecklistListQuery();
  const handleClickMoveCustomPage = () => {
    navigate(ROUTE_PATH.checklistCustom);
  };
  const handleClickFloatingButton = () => {
    navigate(ROUTE_PATH.checklistNew);
  };

  if (isLoading) {
    return <SkChecklistList />;
  }

  if (!checklistList) throw error;

  return (
    <>
      <Header center={<Header.Text>체크리스트</Header.Text>} />
      <S.FlexBox>
        <CustomBanner onClick={handleClickMoveCustomPage} />
      </S.FlexBox>
      <Layout>
        <S.ListBox>
          {checklistList.length ? (
            <>
              {checklistList?.map((checklist: ChecklistPreview) => (
                <ChecklistPreviewCard key={checklist.checklistId} checklist={checklist} />
              ))}
            </>
          ) : (
            <NoChecklistTemplate />
          )}
        </S.ListBox>
      </Layout>
      <FloatingButton size="extends" onClick={handleClickFloatingButton}>
        <PlusBlack /> 작성하기
      </FloatingButton>
    </>
  );
};
export default ChecklistListPage;
const S = {
  FlexBox: styled.div`
    padding: 0 16px;
  `,
  ListBox: styled.div`
    ${flexColumn}
    gap: 8px;
    overflow-y: scroll;
  `,
  DefaultButton: styled.div`
    position: fixed;
    top: 20px;
    right: 40px;
    z-index: 1000;
  `,
};
