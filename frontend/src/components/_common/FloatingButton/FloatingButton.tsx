import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { FOOTER_SIZE } from '@/constants/style';
import { flexCenter } from '@/styles/common';
import theme from '@/styles/theme';
import { fontStyle } from '@/utils/fontStyle';
import { getOpacityColor } from '@/utils/getOpacityColor';

type Size = 'small' | 'medium' | 'extends';
type Color = 'yellow' | 'green' | 'subGreen';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: () => void;
  size?: Size;
  color?: Color;
  'aria-label'?: string;
}

const FloatingButton = ({
  children,
  onClick,
  size = 'medium',
  color = 'yellow',
  'aria-label': ariaLabel = 'add',
  ...rest
}: Props) => {
  return (
    <S.Wrapper>
      <S.Button size={size} color={color} aria-label={ariaLabel} onClick={onClick} {...rest} tabIndex={1}>
        {children}
      </S.Button>
    </S.Wrapper>
  );
};

export default FloatingButton;

const sizeStyle = {
  small: css`
    width: 4rem;
    height: 4rem;
  `,
  medium: css`
    width: 5.6rem;
    height: 5.6rem;
  `,
  large: css`
    width: 9.6rem;
    height: 9.6rem;
  `,
  extends: css`
    display: flex;
    height: 5.6rem;
    padding: 1.6rem;
    gap: 0.8rem;
  `,
};

const colorStyle = {
  yellow: css`
    background-color: ${theme.color.primary[500]};

    color: ${theme.color.mono.black};

    &:hover,
    &:active {
      background-color: ${theme.color.primary[600]};
    }
  `,
  green: css`
    background-color: ${theme.color.secondary[500]};

    color: ${theme.color.mono.black};

    &:hover,
    &:active {
      background-color: ${theme.color.secondary[600]};
    }
  `,
  subGreen: css`
    background-color: ${theme.color.green[400]};

    color: ${theme.color.mono.black};

    &:hover,
    &:active {
      background-color: ${theme.color.green[400]};
    }
  `,
};

const S = {
  Wrapper: styled.div`
    display: flex;
    position: fixed;
    bottom: calc(2% + ${FOOTER_SIZE}rem);
    left: 55%;
    z-index: ${theme.zIndex.FLOATING_BUTTON};
    width: 100%;
    padding-right: 10%;
    justify-content: flex-end;
    transform: translateX(-50%);
    max-width: 60rem;

    @media (min-width: ${theme.viewport.MOBILE}px) {
      padding-right: 2rem;
    }
  `,
  Button: styled.button<{ size: Size; color: Color }>`
    ${flexCenter}
    border: none;
    border-radius: 5.6rem;
    ${({ size }) => sizeStyle[size]};
    ${({ color }) => colorStyle[color]};
    ${({ theme }) => fontStyle(theme.font.headline[1].B)}
    box-shadow: 0 0 12px ${getOpacityColor('#171719', 0.2)};
    outline: none;
    cursor: pointer;
  `,
};
