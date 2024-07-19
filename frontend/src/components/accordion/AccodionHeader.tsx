import styled from '@emotion/styled';

import { useAccordionContext } from '@/components/accordion/AccordionContext';
import { title2 } from '@/styles/common';

interface Props {
  isMarked: boolean;
  text: string;
  id: number;
}
const AccordionHeader = ({ isMarked, text, id }: Props) => {
  const { isAccordionOpen, handleAccordionOpenChange } = useAccordionContext();

  return (
    <S.HeaderContainer onClick={() => handleAccordionOpenChange(id)}>
      <S.HeaderMark isMarked={isMarked} />
      <S.HeaderTitle>{text}</S.HeaderTitle>

      {/* {isAccordionOpen ? <ArrowUpSmall /> : <ArrowDownSmall />} */}
      {isAccordionOpen(id) ? 3 : 6}
    </S.HeaderContainer>
  );
};

export default AccordionHeader;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50px;

  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 12px;
  align-items: center;
  gap: 10px;
`;

const HeaderTitle = styled.div`
  ${title2}
`;

const HeaderMark = styled.div<{ isMarked: boolean }>`
  visibility: ${({ isMarked }) => (isMarked ? 'visible' : 'hidden')};
  width: 12px;
  height: 100%;

  background-color: ${({ theme }) => theme.palette.yellow500};
  border-radius: 8px 0 0 8px;
`;

const S = {
  HeaderContainer,
  HeaderMark,
  HeaderTitle,
};
