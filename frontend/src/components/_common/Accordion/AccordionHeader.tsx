import styled from '@emotion/styled';

import { ArrowDownIcon, ArrowUpIcon } from '@/assets/assets';
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
  isShowMarkerIfOpen?: boolean;
}
const AccordionHeader = ({
  id,
  openButton = <ArrowUpIcon />,
  closeButton = <ArrowDownIcon />,
  text,
  isMarked = true,
  markColor = theme.palette.yellow500,
  isShowMarkerIfOpen = true,
}: Props) => {
  const { isAccordionOpen, handleAccordionOpenChange } = useAccordionContext();

  return (
    <S.HeaderContainer onClick={() => handleAccordionOpenChange(id)}>
      <S.FlexBetween>
        {!isShowMarkerIfOpen && <S.HeaderMark isMarked={isMarked} markColor={markColor} />}
        {isAccordionOpen(id) && isShowMarkerIfOpen && <S.HeaderMark isMarked={isMarked} markColor={markColor} />}
        {!isAccordionOpen(id) && isShowMarkerIfOpen && <S.HeaderMark isMarked={false} />}
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
  HeaderContainer: styled.button`
    display: flex;
    position: relative;
    width: 100%;
    height: 4.5rem;

    background-color: ${({ theme }) => theme.palette.white};
    border-radius: 1.2rem;
    gap: 1rem;

    cursor: pointer;
  `,
  FlexBox: styled.div`
    ${flexCenter}
    gap: 1rem;
  `,
  FlexBetween: styled.div`
    ${flexSpaceBetween}
    height: 100%;
  `,
  HeaderTitle: styled.div`
    ${title3};
    display: flex;
    padding-left: 1.5rem;
    align-items: center;
  `,
  HeaderMark: styled.div<{ isMarked: boolean; markColor?: string }>`
    opacity: ${({ isMarked }) => (isMarked ? 1 : 0)};
    width: 1.2rem;

    background-color: ${({ markColor }) => markColor};
    border-radius: 0.8rem 0 0 0.8rem;
    transition: opacity 0.3s ease;
  `,
  OpenBox: styled.div<{ onClick?: () => void }>`
    position: absolute;
    top: 1rem;
    right: 1rem;
    ${flexCenter}
  `,
};
