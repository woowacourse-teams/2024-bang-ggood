import styled from '@emotion/styled';
import { useRef } from 'react';

import { useAccordionContext } from '@/components/_common/Accordion/AccordionContext';

const AccordionBody = ({ children, id }: { children: React.ReactNode; id: number }) => {
  const bodyRef = useRef(null);
  const { isAccordionOpen } = useAccordionContext();

  const isCurrentAccordionOpen = isAccordionOpen(id);

  return (
    <S.Container ref={bodyRef} isOpen={isCurrentAccordionOpen}>
      {children}
    </S.Container>
  );
};

export default AccordionBody;

const Container = styled.div<{ isOpen: boolean }>`
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  overflow: hidden;

  height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  margin-top: ${({ isOpen }) => (isOpen ? '10px' : '0')};

  background-color: ${({ theme }) => theme.palette.white};
  transition: max-height 0.3s cubic-bezier(0.15, 0.1, 0.25, 1);
  border-radius: 10px;
`;

const S = {
  Container,
};
