import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { boxShadow } from '@/styles/common';
import theme from '@/styles/theme';

type Size = 'small' | 'medium' | 'extends';

type Color = 'yellow' | 'green' | 'subGreen';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
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
      <S.Button size={size} color={color} aria-label={ariaLabel} onClick={onClick} {...rest}>
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
  Wrapper: styled.div`
    display: flex;
    position: fixed;
    bottom: 10%;
    left: 45%;
    z-index: ${({ theme }) => theme.zIndex.FLOATING_BUTTON};
    width: 100%;
    padding-right: 10%;
    transform: translateX(-45%);
    max-width: 600px;
    justify-content: flex-end;
  `,
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
