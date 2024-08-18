import styled from '@emotion/styled';

import { flexColumn, Skeleton } from '@/styles/common';

const SkChecklistAnswer = () => {
  return (
    <Sk.Container>
      <Sk.AccordionHeader />
      <Sk.AccordionBody />
    </Sk.Container>
  );
};

const Sk = {
  Container: styled.div`
    ${flexColumn}
    gap: 10px;
    margin-top: 20px;
  `,
  AccordionHeader: styled.div`
    width: 100%;
    height: 60px;
    ${Skeleton}
  `,
  AccordionBody: styled.div`
    width: 100%;
    height: 300px;
    ${Skeleton}
  `,
};

export default SkChecklistAnswer;
