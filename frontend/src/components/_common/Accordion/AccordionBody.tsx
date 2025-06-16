import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

import { useAccordionContext } from '@/components/_common/Accordion/AccordionContext';

interface Props {
  children: React.ReactNode;
  id: number;
}

const AccordionBody = ({ children, id }: Props) => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const { isAccordionOpen } = useAccordionContext();
  const isCurrentAccordionOpen = isAccordionOpen(id);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      if (isCurrentAccordionOpen) {
        setMaxHeight(bodyRef.current.scrollHeight);
      } else {
        setMaxHeight(0);
      }
    }
  }, [isCurrentAccordionOpen]);

  return (
    <S.Container ref={bodyRef} isOpen={isCurrentAccordionOpen} maxHeight={maxHeight}>
      {children}
    </S.Container>
  );
};

const S = {
  Container: styled.div<{ isOpen: boolean; maxHeight: number }>`
    overflow: hidden;

    margin: 0 0 0.8rem;
    max-height: ${({ maxHeight }) => maxHeight}px;
    transition: max-height 0.4s cubic-bezier(0.15, 0.1, 0.25, 1);
    border-radius: 0.8rem;

    background-color: ${({ theme }) => theme.palette.white};
  `,
};

export default AccordionBody;
