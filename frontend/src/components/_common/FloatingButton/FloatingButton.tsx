import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { FOOTER_SIZE } from '@/constants/style';
import { boxShadow, title3 } from '@/styles/common';
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
    width: 4rem;
    height: 4rem;

    font-size: ${theme.text.size.xSmall};
  `,
  medium: css`
    width: 5rem;
    height: 5rem;

    font-size: ${theme.text.size.small};
  `,
  extends: css`
    display: flex;
    width: 13rem;
    height: 5rem;

    font-size: ${theme.text.size.small};
    gap: 1rem;
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
  Wrapper: styled.div`
    display: flex;
    position: fixed;
    bottom: calc(5% + ${FOOTER_SIZE}rem);
    left: 50%;
    z-index: ${theme.zIndex.FLOATING_BUTTON};
    transform: translateX(-50%);
    max-width: 60rem;
    justify-content: flex-end;
    width: 100%;
    padding-right: 10%;

    @media (min-width: ${theme.viewport.MOBILE}rem) {
      padding-right: 2rem;
    }
  `,
  Button: styled.button<{ size: Size; color: Color }>`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 5rem;
    ${({ size }) => sizeStyle[size]};
    ${({ color }) => colorStyle[color]};
    ${title3};
    ${boxShadow};
    outline: none;
    cursor: pointer;
  `,
};
