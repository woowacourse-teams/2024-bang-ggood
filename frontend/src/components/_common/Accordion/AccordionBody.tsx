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

const S = {
  Container: styled.div<{ isOpen: boolean }>`
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    overflow: hidden;
    margin-top: 10px;

    background-color: ${({ theme }) => theme.palette.white};
    max-height: ${({ isOpen }) => (isOpen ? '1000px' : '0')};
    transition: max-height 0.2s cubic-bezier(0.15, 0.1, 0.25, 1);
    border-radius: 12px;
  `,
};
