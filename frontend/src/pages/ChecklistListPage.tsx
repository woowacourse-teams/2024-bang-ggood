import styled from '@emotion/styled';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import { LampIcon, PencilIcon, PlusBlack } from '@/assets/assets';
import ListErrorFallback from '@/components/_common/errorBoundary/ListErrorFallback';
import TitleErrorFallback from '@/components/_common/errorBoundary/TitleErrorFallback';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FloatingButton from '@/components/_common/FloatingButton/FloatingButton';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import ChecklistListContainer from '@/components/ChecklistList/ChecklistListContainer';
import ChecklistListTitle from '@/components/ChecklistList/ChecklistListTitle';
import CustomBanner from '@/components/ChecklistList/CustomBanner';
import LikeFilterButton from '@/components/ChecklistList/LikeFilterButton';
import { ROUTE_PATH } from '@/constants/routePath';
import { trackAddChecklistButton } from '@/service/amplitude/trackEvent';
import { useTrackPageView } from '@/service/amplitude/useTrackPageView';
import { boxShadow, flexRow } from '@/styles/common';
import theme from '@/styles/theme';

const ChecklistListPage = () => {
  useTrackPageView({ eventName: '[View] 체크리스트 리스트 페이지' });

  const navigate = useNavigate();

  const handleClickMoveCustomPage = () => navigate(ROUTE_PATH.checklistQuestionSelect);

  const handleClickMoveQuestionSelectPage = () => {
    navigate(ROUTE_PATH.roomCompareSelect);
  };

  const handleClickFloatingButton = () => {
    trackAddChecklistButton();
    navigate(ROUTE_PATH.checklistNew);
  };

  return (
    <>
      <Header center={<Header.Text>체크리스트</Header.Text>} />
      <Layout bgColor={theme.palette.background} withFooter withHeader>
        <FlexBox.Vertical>
          <CustomBanner
            onClick={handleClickMoveCustomPage}
            Icon={<PencilIcon width={30} height={30} aria-hidden="true" />}
            title={'체크리스트 질문 템플릿'}
            buttonColor={theme.palette.green500}
            buttonText="편집하기"
            buttonDetailText={'체크리스트 질문을 편집하려면 이 버튼을 누르세요.'}
            hoverButtonColor={theme.palette.green600}
          />
          <CustomBanner
            onClick={handleClickMoveQuestionSelectPage}
            Icon={<LampIcon width={30} height={30} aria-hidden="true" />}
            title={'체크리스트 비교'}
            buttonColor={theme.palette.yellow600}
            buttonText="비교하기"
            buttonDetailText={'체크리스트 질문을 편집하려면 이 버튼을 누르세요.'}
            hoverButtonColor={theme.palette.yellow700}
          />
        </FlexBox.Vertical>
        <S.Spacer height="1.4rem" />
        <ErrorBoundary fallback={<TitleErrorFallback title="내가 둘러본 방" />}>
          <FlexBox.Horizontal justify="space-between" align="center">
            <ChecklistListTitle />
            <LikeFilterButton />
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
