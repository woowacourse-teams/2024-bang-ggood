import styled from '@emotion/styled';

import { ArrowDownSmall, ArrowUpSmall } from '@/assets/assets';
import { useAccordionContext } from '@/components/accordion/AccordionContext';
import { flexCenter, title2 } from '@/styles/common';

interface Props {
  text: string;
  id: number;
}
const AccordionHeader = ({ text, id }: Props) => {
  const { isAccordionOpen, handleAccordionOpenChange } = useAccordionContext();

  return (
    <S.HeaderContainer onClick={() => handleAccordionOpenChange(id)}>
      <S.FlexBox>
        <S.HeaderMark isMarked={isAccordionOpen(id)} />
        <S.HeaderTitle>{text}</S.HeaderTitle>
      </S.FlexBox>
      <S.ArrowBox>{isAccordionOpen(id) ? <ArrowUpSmall /> : <ArrowDownSmall />}</S.ArrowBox>
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
  justify-content: space-between;
  gap: 10px;
`;

const FlexBox = styled.div`
  ${flexCenter}
  gap:10px;
`;

const HeaderTitle = styled.div`
  ${title2}
`;

const HeaderMark = styled.div<{ isMarked: boolean }>`
  opacity: ${({ isMarked }) => (isMarked ? 1 : 0)};
  width: 12px;
  height: 100%;

  background-color: ${({ theme }) => theme.palette.yellow500};
  border-radius: 8px 0 0 8px;
  transition: opacity 0.3s ease;
`;

const ArrowBox = styled.div`
  width: 50px;
  ${flexCenter}
`;

const S = {
  HeaderContainer,
  HeaderMark,
  HeaderTitle,
  FlexBox,
  ArrowBox,
};
