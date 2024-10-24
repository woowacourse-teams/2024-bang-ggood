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
import { useTrackPageView } from '@/service/amplitude/useTrackPageView';
import { boxShadow, flexRow } from '@/styles/common';
import theme from '@/styles/theme';

const ChecklistListPage = () => {
  useTrackPageView({ eventName: '[View] 체크리스트 리스트 페이지' });

  const navigate = useNavigate();
  const { isLikeFiltered: isEnabled, toggleFilter } = useGetChecklistList();
  // const {  } = useUserQuery();
  const handleClickMoveCustomPage = () => navigate(ROUTE_PATH.checklistQuestionSelect);
  const handleClickFloatingButton = () => navigate(ROUTE_PATH.checklistNew);

  return (
    <>
      <Header center={<Header.Text>체크리스트</Header.Text>} />
      <Layout bgColor={theme.palette.background} withFooter withHeader>
        <S.FlexBox>
          <CustomBanner onClick={handleClickMoveCustomPage} />
        </S.FlexBox>
        <S.Spacer height="1.4rem" />
        <ErrorBoundary fallback={<TitleErrorFallback title="내가 둘러본 방" />}>
          <FlexBox.Horizontal justify="space-between" align="center">
            <ChecklistListTitle />
            <S.LikeFilterBox onClick={toggleFilter} $isChecked={isEnabled}>
              <Like fill={theme.palette.red500} stroke={theme.palette.red500} width="2rem" />
              좋아요
            </S.LikeFilterBox>
          </FlexBox.Horizontal>
        </ErrorBoundary>
        <S.Spacer height="1rem" />
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
  Spacer: styled.div<{ width?: string; height?: string }>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
  `,
};
