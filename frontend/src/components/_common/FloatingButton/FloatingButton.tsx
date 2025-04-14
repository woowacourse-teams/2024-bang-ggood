import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { FOOTER_SIZE } from '@/constants/style';
import { boxShadow, flexCenter } from '@/styles/common';
import theme from '@/styles/theme';

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
    width: 2.5rem;
    height: 2.5rem;
  `,
  medium: css`
    width: 3.5rem;
    height: 3.5rem;
  `,
  large: css`
    width: 6rem;
    height: 6rem;
  `,
  extends: css`
    display: flex;
    height: 3.5rem;
    padding: 1.5rem;
    gap: 0.5rem;
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
      background-color: ${theme.palette.green600};
    }
  `,
  subGreen: css`
    background-color: ${theme.color.green[400]};

    color: ${theme.color.mono.black};

    &:hover,
    &:active {
      background-color: ${theme.palette.subGreen600};
    }
  `,
};

const S = {
  Wrapper: styled.div`
    display: flex;
    justify-content: flex-end;
    position: fixed;
    bottom: calc(5% + ${FOOTER_SIZE}rem);
    left: 50%;
    z-index: ${theme.zIndex.FLOATING_BUTTON};
    width: 100%;
    padding-right: 10%;
    transform: translateX(-50%);
    max-width: 60rem;

    @media (min-width: ${theme.viewport.MOBILE}px) {
      padding-right: 2rem;
    }
  `,
  Button: styled.button<{ size: Size; color: Color }>`
    ${flexCenter}
    border: none;
    border-radius: 3.5rem;
    ${({ size }) => sizeStyle[size]};
    ${({ color }) => colorStyle[color]};
    ${theme.font.headline[1].B}
    ${boxShadow};
    outline: none;
    cursor: pointer;
  `,
};
