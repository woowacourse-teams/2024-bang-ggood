import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

import AccordionHeader from '@/components/common/Accordion/AccodionHeader';
import AccordionBody from '@/components/common/Accordion/AccordionBody';
import { AccordionProvider } from '@/components/common/Accordion/AccordionContext';
import { flexColumn } from '@/styles/common';

interface Props extends PropsWithChildren {
  // TODO: 내부 children 선언 혹은 extend 할지 통일하기
  width?: string;
}

const Accordion = ({ width = '100%', children }: Props) => {
  return (
    // TODO: 숫자 7 상수처리
    <AccordionProvider count={7}>
      <S.Container width={width}>{children}</S.Container>
    </AccordionProvider>
  );
};

Accordion.header = AccordionHeader;
Accordion.body = AccordionBody;

const S = {
  Container: styled.div<{ width: string }>`
    ${flexColumn};
    width: ${({ width }) => width};
    gap: 10px;
  `,
};
export default Accordion;
