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
import { flexColumn, title3 } from '@/styles/common';
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

  if (isLoading) return <SkChecklistList />;

  return (
    <>
      <Header center={<Header.Text>체크리스트</Header.Text>} />
      <Layout bgColor={theme.palette.background} withFooter withHeader>
        <S.Title>
          방 둘러보면서 체크리스트 체크 <S.Count>{checklistList?.length}</S.Count>
        </S.Title>
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
        <PlusBlack />방 체크하기
      </FloatingButton>
    </>
  );
};

export default ChecklistListPage;

const S = {
  Title: styled.h1`
    ${title3}
  `,
  Count: styled.span`
    color: ${({ theme }) => theme.palette.green500};
  `,
  FlexBox: styled.div`
    display: flex;
    margin: 1rem 0;
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
