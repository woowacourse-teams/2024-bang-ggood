import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

import AccordionHeader from '@/components/common/Accordion/AccodionHeader';
import AccordionBody from '@/components/common/Accordion/AccordionBody';
import { AccordionProvider } from '@/components/common/Accordion/AccordionContext';
import { flexColumn } from '@/styles/common';

interface Props extends PropsWithChildren {
  width?: string;
}

const Accordion = ({ width = '100%', children }: Props) => {
  return (
    <AccordionProvider count={7}>
      <S.Container width={width}>{children}</S.Container>
    </AccordionProvider>
  );
};

Accordion.header = AccordionHeader;
Accordion.body = AccordionBody;

const Container = styled.div<{ width: string }>`
  ${flexColumn};
  width: ${({ width }) => width};
  gap: 10px;
`;

const S = {
  Container,
};
export default Accordion;
