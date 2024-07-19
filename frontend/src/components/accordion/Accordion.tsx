import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

import AccordionHeader from '@/components/accordion/AccodionHeader';
import AccordionBody from '@/components/accordion/AccordionBody';
import { AccordionProvider } from '@/components/accordion/AccordionContext';
import { flexColumn } from '@/styles/common';

const Accordion = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <AccordionProvider count={7}>
      <S.Container>{children}</S.Container>
    </AccordionProvider>
  );
};

Accordion.header = AccordionHeader;
Accordion.body = AccordionBody;

const Container = styled.div`
  ${flexColumn};
  gap: 8px;
`;

const S = {
  Container,
};
export default Accordion;
