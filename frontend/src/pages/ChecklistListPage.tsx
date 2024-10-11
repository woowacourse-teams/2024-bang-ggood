import styled from '@emotion/styled';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import { PlusBlack } from '@/assets/assets';
import FloatingButton from '@/components/_common/FloatingButton/FloatingButton';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import ChecklistListContainer from '@/components/ChecklistList/ChecklistListContainer';
import CustomBanner from '@/components/ChecklistList/CustomBanner';
import ErrorFallback from '@/components/ChecklistList/ErrorFallback';
import { ROUTE_PATH } from '@/constants/routePath';
import { title3 } from '@/styles/common';
import theme from '@/styles/theme';

const ChecklistListPage = () => {
  const navigate = useNavigate();
  const [checklistSize, setChecklistSize] = useState<number>(0);

  const handleClickMoveCustomPage = () => {
    navigate(ROUTE_PATH.checklistQuestionSelect);
  };

  const handleClickFloatingButton = () => {
    navigate(ROUTE_PATH.checklistNew);
  };

  return (
    <>
      <Header center={<Header.Text>체크리스트</Header.Text>} />
      <Layout bgColor={theme.palette.background} withFooter withHeader>
        <S.Title>
          방 둘러볼 때 꼭 필요한 체크리스트 <S.Count>{checklistSize}</S.Count>
        </S.Title>
        <S.FlexBox>
          <CustomBanner onClick={handleClickMoveCustomPage} />
        </S.FlexBox>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ChecklistListContainer setChecklistSize={setChecklistSize} />
        </ErrorBoundary>
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
    margin: 1.6rem 0 1rem;
  `,
};
