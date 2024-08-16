import styled from '@emotion/styled';

import { ArrowDownSmall, ArrowUpSmall } from '@/assets/assets';
import { useAccordionContext } from '@/components/_common/Accordion/AccordionContext';
import { flexCenter, flexSpaceBetween, title3 } from '@/styles/common';
import theme from '@/styles/theme';

interface Props {
  id: number;
  openButton?: React.ReactNode;
  closeButton?: React.ReactNode;
  text?: string;
  isMarked?: boolean;
  markColor?: string;
}
const AccordionHeader = ({
  id,
  openButton = <ArrowUpSmall />,
  closeButton = <ArrowDownSmall />,
  text,
  isMarked = true,
  markColor = theme.palette.yellow500,
}: Props) => {
  const { isAccordionOpen, handleAccordionOpenChange } = useAccordionContext();

  return (
    <S.HeaderContainer onClick={() => handleAccordionOpenChange(id)}>
      <S.FlexBetween>
        {isAccordionOpen(id) ? (
          <S.HeaderMark isMarked={isMarked} markColor={markColor} />
        ) : (
          <S.HeaderMark isMarked={false} />
        )}

        <S.HeaderTitle>{text}</S.HeaderTitle>
        <S.OpenBox onClick={() => handleAccordionOpenChange}>
          {isAccordionOpen(id) ? openButton : closeButton}
        </S.OpenBox>
      </S.FlexBetween>
    </S.HeaderContainer>
  );
};

export default AccordionHeader;

const S = {
  HeaderContainer: styled.div`
    display: flex;
    position: relative;
    height: 45px;

    background-color: ${({ theme }) => theme.palette.white};
    border-radius: 12px;
    gap: 10px;
  `,

  FlexBox: styled.div`
    ${flexCenter}
    gap:10px;
  `,

  FlexBetween: styled.div`
    ${flexSpaceBetween}
    height: 100%;
  `,

  HeaderTitle: styled.div`
    ${title3};
    display: flex;
    padding-left: 15px;
    align-items: center;
  `,

  HeaderMark: styled.div<{ isMarked: boolean; markColor?: string }>`
    opacity: ${({ isMarked }) => (isMarked ? 1 : 0)};
    width: 12px;

    background-color: ${({ markColor }) => markColor};
    border-radius: 8px 0 0 8px;
    transition: opacity 0.3s ease;
  `,

  OpenBox: styled.div<{ onClick?: () => void }>`
    position: absolute;
    top: 10px;
    right: 10px;
    ${flexCenter}
  `,
};
