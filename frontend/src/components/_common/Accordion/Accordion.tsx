import styled from '@emotion/styled';

import AccordionBody from '@/components/_common/Accordion/AccordionBody';
import { AccordionProvider } from '@/components/_common/Accordion/AccordionContext';
import AccordionHeader from '@/components/_common/Accordion/AccordionHeader';
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
  Container: styled.section<{ width: string }>`
    ${flexColumn};
    width: ${({ width }) => width};
    gap: 1rem;
  `,
};
export default Accordion;
