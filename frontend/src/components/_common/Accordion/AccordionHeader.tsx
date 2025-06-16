import styled from '@emotion/styled';
import { ButtonHTMLAttributes } from 'react';

import { ArrowDownIcon, ArrowUpIcon } from '@/assets/assets';
import { useAccordionContext } from '@/components/_common/Accordion/AccordionContext';
import { flexCenter, flexSpaceBetween } from '@/styles/common';
import theme from '@/styles/theme';
import { fontStyle } from '@/utils/fontStyle';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id'> {
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
  isMarked = false,
  markColor = theme.color.primary[600],
  isShowMarkerIfOpen = false,
  ...rest
}: Props) => {
  const { isAccordionOpen, handleAccordionOpenChange } = useAccordionContext();

  return (
    <S.HeaderContainer onClick={() => handleAccordionOpenChange(id)} {...rest}>
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
    height: 4.8rem;

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
    ${({ theme }) => fontStyle(theme.font.headline[2].B)};
    display: flex;
    align-items: center;
  `,
  HeaderMark: styled.div<{ isMarked: boolean; markColor?: string }>`
    opacity: ${({ isMarked }) => (isMarked ? 1 : 0)};
    width: 1.6rem;

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
