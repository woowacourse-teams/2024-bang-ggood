import styled from '@emotion/styled';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import { PlusBlack } from '@/assets/assets';
import ListErrorFallback from '@/components/_common/errorBoundary/ListErrorFallback';
import TitleErrorFallback from '@/components/_common/errorBoundary/TitleErrorFallback';
import FloatingButton from '@/components/_common/FloatingButton/FloatingButton';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import ChecklistListContainer from '@/components/ChecklistList/ChecklistListContainer';
import ChecklistListTitle from '@/components/ChecklistList/ChecklistListTitle';
import CustomBanner from '@/components/ChecklistList/CustomBanner';
import { ROUTE_PATH } from '@/constants/routePath';
import theme from '@/styles/theme';

const ChecklistListPage = () => {
  const navigate = useNavigate();

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
        <ErrorBoundary fallback={<TitleErrorFallback title="방 둘러볼 때 꼭 필요한 체크리스트" />}>
          <ChecklistListTitle />
        </ErrorBoundary>
        <S.FlexBox>
          <CustomBanner onClick={handleClickMoveCustomPage} />
        </S.FlexBox>
        <ErrorBoundary FallbackComponent={ListErrorFallback}>
          <ChecklistListContainer />
        </ErrorBoundary>
      </Layout>
      <FloatingButton size="extends" onClick={handleClickFloatingButton} tabIndex={1}>
        <PlusBlack />방 체크하기
      </FloatingButton>
    </>
  );
};

export default ChecklistListPage;

const S = {
  FlexBox: styled.div`
    display: flex;
    margin: 1.6rem 0 1rem;
  `,
};
