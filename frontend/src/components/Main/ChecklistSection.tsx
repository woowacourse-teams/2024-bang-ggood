import styled from '@emotion/styled';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/_common/Button/Button';
import ErrorFallback from '@/components/ChecklistList/ErrorFallback';
import ChecklistCardContainer from '@/components/Main/ChecklistCardContainer';
import { ROUTE_PATH } from '@/constants/routePath';
import { boxShadow, boxShadowSpread, flexColumn, flexRow, flexSpaceBetween, title3, title4 } from '@/styles/common';

const ChecklistSection = () => {
  const navigate = useNavigate();
  const [checklistSize, setChecklistSize] = useState<number>();

  const handleClickList = () => {
    navigate(ROUTE_PATH.checklistList);
  };

  return (
    <>
      <S.Title>방 둘러볼 때 꼭 필요한 체크리스트</S.Title>
      <S.Container>
        <S.Row>
          <S.ContainerTitle>
            나의 체크리스트 <S.Count>{checklistSize}</S.Count>
          </S.ContainerTitle>
          <Button size="xSmall" label="전체 보기" onClick={handleClickList} />
        </S.Row>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ChecklistCardContainer setChecklistSize={setChecklistSize} />
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
  ContainerTitle: styled.div`
    ${title3}
  `,
  Count: styled.span`
    ${title3}
    color: ${({ theme }) => theme.palette.green500};
  `,
};
