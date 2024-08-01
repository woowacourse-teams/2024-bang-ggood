import styled from '@emotion/styled';

import { useAccordionContext } from '@/components/common/Accordion/AccordionContext';
import { flexCenter, title2 } from '@/styles/common';

interface Props {
  id: number;
  children?: React.ReactNode;
  hasMark: boolean;
  hasRightArrowButton?: boolean;
  openButton?: React.ReactNode;
  closeButton?: React.ReactNode;
  text?: string;
}
const AccordionHeader = ({ children, id, hasMark, openButton, closeButton, text }: Props) => {
  const { isAccordionOpen, handleAccordionOpenChange } = useAccordionContext();

  return (
    <S.HeaderContainer onClick={() => handleAccordionOpenChange(id)}>
      <S.FlexBetween>
        <S.FlexBox>
          {hasMark && <S.HeaderMark isMarked={isAccordionOpen(id)} />}
          {text}
          <S.HeaderTitle>{children}</S.HeaderTitle>
        </S.FlexBox>
        <S.OpenBox onClick={() => handleAccordionOpenChange}>
          {isAccordionOpen(id) ? openButton : closeButton}
        </S.OpenBox>
      </S.FlexBetween>
    </S.HeaderContainer>
  );
};

export default AccordionHeader;

const HeaderContainer = styled.div`
  display: flex;
  position: relative;
  padding: 16px;

  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 12px;
  gap: 10px;
`;

const FlexBox = styled.div`
  ${flexCenter}
  gap:10px;
`;

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
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

const OpenBox = styled.div<{ onClick?: () => void }>`
  position: absolute;
  top: 10px;
  right: 10px;
  ${flexCenter}
`;

const S = {
  HeaderContainer,
  HeaderMark,
  HeaderTitle,
  FlexBox,
  OpenBox,
  FlexBetween,
};
