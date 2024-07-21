import styled from '@emotion/styled';

import { useAccordionContext } from '@/components/Accordion/AccordionContext';

const AccordionBody = ({ id, children }: { id: number; children: React.ReactNode }) => {
  const { isAccordionOpen } = useAccordionContext();

  const isCurrentAccordionOpen = isAccordionOpen(id);

  return <S.Container isShow={isCurrentAccordionOpen}>{children}</S.Container>;
};

export default AccordionBody;

const Container = styled.div<{ isShow: boolean }>`
  display: ${({ isShow }) => (isShow ? 'block' : 'none')};
  width: 100%;
  min-height: 100px;

  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 12px;
  align-items: center;
`;

const S = {
  Container,
};
