import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { boxShadow, flexRow, title3 } from '@/styles/common';
import theme from '@/styles/theme';

type Size = 'small' | 'medium' | 'extends';

type Color = 'yellow' | 'green' | 'subGreen';

type Position = 'right' | 'bottom';
interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: () => void;
  size?: Size;
  color?: Color;
  'aria-label'?: string;
  position?: Position;
}

const FloatingButton = ({
  children,
  onClick,
  size = 'medium',
  color = 'yellow',
  position = 'right',
  'aria-label': ariaLabel = 'add',
  ...rest
}: Props) => {
  return (
    <S.Wrapper position={position}>
      <S.Button position={position} size={size} color={color} aria-label={ariaLabel} onClick={onClick} {...rest}>
        {children}
      </S.Button>
    </S.Wrapper>
  );
};

export default FloatingButton;

const sizeStyle = {
  small: css`
    width: 40px;
    height: 40px;

    font-size: 12px;
  `,
  medium: css`
    width: 50px;
    height: 50px;

    font-size: 16px;
  `,
  extends: css`
    width: 130px;
    height: 45px;

    font-size: 16px;

    ${flexRow}
    gap: 10px;
  `,
};

const colorStyle = {
  yellow: css`
    background-color: ${theme.palette.yellow500};

    color: ${theme.palette.black};

    &:hover,
    &:active {
      background-color: ${theme.palette.yellow600};
    }
  `,
  green: css`
    background-color: ${theme.palette.green500};

    color: ${theme.palette.white};

    &:hover,
    &:active {
      background-color: ${theme.palette.green600};
    }
  `,
  subGreen: css`
    background-color: ${theme.palette.subGreen500};

    color: ${theme.palette.white};

    &:hover,
    &:active {
      background-color: ${theme.palette.subGreen600};
    }
  `,
};

const S = {
  Wrapper: styled.div<{ position: Position }>`
    display: flex;
    position: fixed;
    right: ${({ position }) => (position === 'bottom' ? 0 : '10px;')};
    bottom: ${({ position }) => (position === 'bottom' ? 0 : '20px')};
    z-index: ${({ theme }) => theme.zIndex.FLOATING_BUTTON};
    width: ${({ position }) => (position === 'bottom' ? '100%' : 'auto')};

    justify-content: ${({ position }) => (position === 'bottom' ? 'center' : 'flex-end')};

    @media (min-width: ${({ theme }) => theme.viewport.MOBILE}px) {
      padding-right: ${({ position }) => (position === 'bottom' ? 0 : '20px')};
    }

    @media (width >= 600px) {
      left: ${({ position }) => (position === 'bottom' ? '50%' : 'auto')};
      max-width: 600px;
      transform: ${({ position }) => (position === 'bottom' ? 'translateX(-50%)' : 'none')};
    }
  `,
  Button: styled.button<{ size: Size; color: Color; position: Position }>`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: ${({ position }) => (position === 'bottom' ? '20px 20px 0 0 ' : '50px')};

    ${({ size }) => sizeStyle[size]}
    ${({ color }) => colorStyle[color]}
    ${title3}
    ${boxShadow};
    outline: none;
    cursor: pointer;
  `,
};
