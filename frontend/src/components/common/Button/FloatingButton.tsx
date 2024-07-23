import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { boxShadow } from '@/styles/common';
import theme from '@/styles/theme';

type Size = 'small' | 'medium' | 'extends';

type Color = 'yellow' | 'green' | 'subGreen';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: Size;
  color?: Color;
  'aria-label'?: string;
}

const FloatingButton = ({
  children,
  size = 'medium',
  color = 'yellow',
  'aria-label': ariaLabel = 'add',
  ...rest
}: Props) => {
  return (
    <S.Button size={size} color={color} aria-label={ariaLabel} {...rest}>
      {children}
    </S.Button>
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
    width: 60px;
    height: 60px;

    font-size: 16px;
  `,
  extends: css`
    width: 100px;
    height: 40px;

    font-size: 16px;
  `,
};

const colorStyle = {
  yellow: css`
    background-color: ${theme.palette.yellow500};

    &:hover,
    &:active {
      background-color: ${theme.palette.yellow600};
    }
  `,
  green: css`
    background-color: ${theme.palette.green500};

    &:hover,
    &:active {
      background-color: ${theme.palette.green600};
    }
  `,
  subGreen: css`
    background-color: ${theme.palette.subGreen500};

    &:hover,
    &:active {
      background-color: ${theme.palette.subGreen600};
    }
  `,
};

const S = {
  Button: styled.button<{ size: Size; color: Color }>`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50px;

    ${({ size }) => sizeStyle[size]}
    ${({ color }) => colorStyle[color]}

    color: ${({ theme }) => theme.palette.white};
    ${boxShadow};
    outline: none;
    cursor: pointer;
  `,
};
