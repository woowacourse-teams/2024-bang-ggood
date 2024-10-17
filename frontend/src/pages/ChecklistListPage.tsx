import styled from '@emotion/styled';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import { PlusBlack } from '@/assets/assets';
import Like from '@/assets/icons/like/Like';
import ListErrorFallback from '@/components/_common/errorBoundary/ListErrorFallback';
import TitleErrorFallback from '@/components/_common/errorBoundary/TitleErrorFallback';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FloatingButton from '@/components/_common/FloatingButton/FloatingButton';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import ChecklistListContainer from '@/components/ChecklistList/ChecklistListContainer';
import ChecklistListTitle from '@/components/ChecklistList/ChecklistListTitle';
import CustomBanner from '@/components/ChecklistList/CustomBanner';
import { ROUTE_PATH } from '@/constants/routePath';
import useGetChecklistList from '@/hooks/useGetChecklistList';
import { boxShadow, flexRow } from '@/styles/common';
import theme from '@/styles/theme';

const ChecklistListPage = () => {
  const navigate = useNavigate();

  const { isEnabled, toggle } = useGetChecklistList();

  const handleClickMoveCustomPage = () => navigate(ROUTE_PATH.checklistQuestionSelect);
  const handleClickFloatingButton = () => navigate(ROUTE_PATH.checklistNew);

  return (
    <>
      <Header center={<Header.Text>체크리스트</Header.Text>} />
      <Layout bgColor={theme.palette.background} withFooter withHeader>
        <ErrorBoundary fallback={<TitleErrorFallback title="방 둘러볼 때 꼭 필요한 체크리스트" />}>
          <FlexBox.Horizontal justify="space-between">
            <ChecklistListTitle />
            <S.LikeFilterBox onClick={toggle} $isChecked={isEnabled}>
              <Like fill={theme.palette.red500} stroke={theme.palette.red500} width="2rem" />
              좋아요
            </S.LikeFilterBox>
          </FlexBox.Horizontal>
        </ErrorBoundary>
        <S.FlexBox>
          <CustomBanner onClick={handleClickMoveCustomPage} />
        </S.FlexBox>
        <ErrorBoundary FallbackComponent={ListErrorFallback}>
          <ChecklistListContainer />
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
  FlexBox: styled.div`
    display: flex;
    margin: 1.6rem 0 1rem;
  `,
  LikeFilterBox: styled.section<{ $isChecked: boolean }>`
    ${flexRow}
    flex: 0 0 auto;
    align-items: center;
    gap: 1rem;
    box-sizing: border-box;
    border-radius: 1.5rem;
    height: 3rem;
    padding: 1.2rem 1.6rem;

    background-color: ${({ theme, $isChecked }) => ($isChecked ? theme.palette.red200 : theme.palette.white)};
    ${boxShadow};
    cursor: pointer;
  `,
};
