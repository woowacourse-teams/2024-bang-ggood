import styled from '@emotion/styled';

import { flexColumn, Skeleton } from '@/styles/common';

const SkChecklistAnswer = () => {
  return (
    <S.Container>
      <S.AccordionHeader />
      <S.AccordionBody />
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    ${flexColumn}
    gap: 1rem;
    margin-top: 2rem;
  `,
  AccordionHeader: styled.div`
    width: 100%;
    height: 6rem;
    ${Skeleton}
  `,
  AccordionBody: styled.div`
    width: 100%;
    height: 30rem;
    ${Skeleton}
  `,
};

export default SkChecklistAnswer;
