import styled from '@emotion/styled';

import AccordionHeader from '@/components/common/Accordion/AccodionHeader';
import AccordionBody from '@/components/common/Accordion/AccordionBody';
import { AccordionProvider } from '@/components/common/Accordion/AccordionContext';
import { flexColumn } from '@/styles/common';

interface Props {
  children?: React.ReactNode;
  width?: string;
  totalCount: number;
}

const Accordion = ({ width = '100%', children, totalCount }: Props) => {
  return (
    <AccordionProvider count={totalCount}>
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
