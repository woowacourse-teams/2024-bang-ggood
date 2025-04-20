import styled from '@emotion/styled';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import { PlusIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import BoxErrorFallback from '@/components/_common/errorBoundary/BoxErrorFallback';
import TitleErrorFallback from '@/components/_common/errorBoundary/TitleErrorFallback';
import ChecklistCardContainer from '@/components/Main/ChecklistCardContainer';
import ChecklistSectionTitle from '@/components/Main/ChecklistSectionTitle';
import { ROUTE_PATH } from '@/constants/routePath';
import { boxShadow, boxShadowSpread, flexColumn, flexRow, flexSpaceBetween } from '@/styles/common';
import { fontStyle } from '@/utils/fontStyle';

const ChecklistSection = () => {
  const navigate = useNavigate();

  const handleClickList = () => {
    navigate(ROUTE_PATH.checklistList);
  };

  const handleNewChecklist = () => {
    navigate(ROUTE_PATH.checklistNew);
  };

  return (
    <>
      <S.Title>방 둘러볼 때 꼭 필요한 체크리스트</S.Title>
      <S.Container>
        <S.Row>
          <ErrorBoundary fallback={<TitleErrorFallback title="내가 둘러본 방" />}>
            <ChecklistSectionTitle />
          </ErrorBoundary>
          <S.ShowMore onClick={handleClickList}>전체 보기</S.ShowMore>
        </S.Row>
        <ErrorBoundary FallbackComponent={BoxErrorFallback}>
          <ChecklistCardContainer />
        </ErrorBoundary>
        <Button label="새로운 방 체크하기" size="full" onClick={handleNewChecklist} Icon={PlusIcon} color="primary" />
      </S.Container>
    </>
  );
};

export default ChecklistSection;

const S = {
  Title: styled.div`
    ${({ theme }) => fontStyle(theme.font.heading[2].B)}
    padding: 1rem 1.6rem 0;
  `,
  ShowMore: styled.button`
    padding: 0 1.6rem;

    color: ${({ theme }) => theme.color.gray[600]};
    ${({ theme }) => fontStyle(theme.font.body[1].B)}
    cursor: pointer;
  `,
  Container: styled.div`
    max-width: 100%;
    box-sizing: border-box;
    margin: 1.6rem;
    padding: 1.6rem;

    background-color: ${({ theme }) => theme.color.primary[100]};

    border-radius: 1.6rem;
    ${boxShadow};
    ${flexColumn};
    gap: 1.2rem;

    ${boxShadowSpread}
  `,
  Row: styled.div`
    box-sizing: border-box;
    width: 100%;
    ${flexRow};
    ${flexSpaceBetween};
    align-items: center;
  `,
};
