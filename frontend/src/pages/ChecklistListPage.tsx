import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { PlusBlack } from '@/assets/assets';
import FloatingButton from '@/components/_common/FloatingButton/FloatingButton';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import ChecklistCard from '@/components/ChecklistList/ChecklistCard';
import CustomBanner from '@/components/ChecklistList/CustomBanner';
import NoChecklistTemplate from '@/components/ChecklistList/NoChecklistTemplate';
import SkChecklistList from '@/components/skeleton/ChecklistList/SkChecklistLst';
import { ROUTE_PATH } from '@/constants/routePath';
import useGetChecklistListQuery from '@/hooks/query/useGetChecklistListQuery';
import { flexColumn } from '@/styles/common';
import theme from '@/styles/theme';
import { ChecklistPreview } from '@/types/checklist';

const ChecklistListPage = () => {
  const navigate = useNavigate();
  const { data: checklistList, isLoading } = useGetChecklistListQuery();

  const handleClickMoveCustomPage = () => {
    navigate(ROUTE_PATH.checklistCustom);
  };
  const handleClickFloatingButton = () => {
    navigate(ROUTE_PATH.checklistNew);
  };

  if (isLoading) {
    return <SkChecklistList />;
  }

  return (
    <>
      <Header center={<Header.Text>체크리스트</Header.Text>} />
      <Layout bgColor={theme.palette.background} withFooter withHeader>
        <S.FlexBox>
          <CustomBanner onClick={handleClickMoveCustomPage} />
        </S.FlexBox>
        <S.ListBox>
          {checklistList?.length ? (
            <>
              {checklistList?.map((checklist: ChecklistPreview) => (
                <ChecklistCard key={checklist.checklistId} checklist={checklist} />
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
    margin-bottom: 1.6rem;
  `,
  ListBox: styled.div`
    ${flexColumn}
    gap: 1.2rem;
    overflow-y: scroll;
    margin-bottom: 8rem;
  `,
  DefaultButton: styled.div`
    position: fixed;
    top: 2rem;
    right: 4rem;
    z-index: 1000;
  `,
};
