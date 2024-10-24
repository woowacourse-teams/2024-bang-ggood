import styled from '@emotion/styled';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/_common/Button/Button';
import BoxErrorFallback from '@/components/_common/errorBoundary/BoxErrorFallback';
import TitleErrorFallback from '@/components/_common/errorBoundary/TitleErrorFallback';
import ChecklistCardContainer from '@/components/Main/ChecklistCardContainer';
import ChecklistSectionTitle from '@/components/Main/ChecklistSectionTitle';
import { ROUTE_PATH } from '@/constants/routePath';
import { boxShadow, boxShadowSpread, flexColumn, flexRow, flexSpaceBetween, title4 } from '@/styles/common';

const ChecklistSection = () => {
  const navigate = useNavigate();

  const handleClickList = () => {
    navigate(ROUTE_PATH.checklistList);
  };

  return (
    <>
      <S.Title>방 둘러볼 때 꼭 필요한 체크리스트</S.Title>
      <S.Container>
        <S.Row>
          <ErrorBoundary fallback={<TitleErrorFallback title="내가 둘러본 방" />}>
            <ChecklistSectionTitle />
          </ErrorBoundary>
          <Button size="xSmall" label="전체 보기" onClick={handleClickList} />
        </S.Row>
        <ErrorBoundary FallbackComponent={BoxErrorFallback}>
          <ChecklistCardContainer />
        </ErrorBoundary>
      </S.Container>
    </>
  );
};

export default ChecklistSection;

const S = {
  Title: styled.div`
    ${title4};
    margin: 1rem 1.6rem 0;
  `,
  Container: styled.div`
    max-width: 100%;
    box-sizing: border-box;
    margin: 1.6rem;
    padding: 2.4rem 1.6rem;

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
