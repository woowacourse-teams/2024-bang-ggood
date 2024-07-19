import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { title2, title3, title4 } from '@/styles/common';
import theme from '@/styles/theme';

type ButtonSize = 'small' | 'medium' | 'full';
type ColorOption = 'light' | 'dark' | 'disabled';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  color?: ColorOption;
  label: string;
  isSquare?: boolean;
  onClick?: () => void;
}

const RoundButton = ({ size = 'medium', color = 'light', label, isSquare = false, onClick = () => {} }: Props) => {
  return (
    <S.Button size={size} color={color} isSquare={isSquare} onClick={color !== 'disabled' ? onClick : () => {}}>
      {label}
    </S.Button>
  );
};

export default RoundButton;

const S = {
  Button: styled.button<{ size: ButtonSize; color: ColorOption; isSquare: boolean }>`
    ${({ isSquare }) => (isSquare ? 'border-radius: 8px' : 'border-radius: 100px')};
    ${({ size }) => sizeStyles[size]};
    ${({ color }) => ColorStyles[color]};
    cursor: pointer;
  `,
};

const ColorStyles = {
  light: css`
    background-color: ${theme.palette.grey100};

    color: ${theme.palette.black};

    &:hover,
    &:active {
      background-color: ${theme.palette.grey200};
    }
  `,
  dark: css`
    background-color: ${theme.palette.black};

    color: ${theme.palette.white};

    &:hover,
    &:active {
      background-color: ${theme.palette.grey600};
    }
  `,
  disabled: css`
    background-color: ${theme.palette.grey200};

    color: ${theme.palette.grey400};
  `,
};

const sizeStyles = {
  small: css`
    padding: 10px 24px;
    ${title4}
  `,
  medium: css`
    padding: 12px 48px;
    ${title3}
  `,
  full: css`
    width: 100%;
    padding: 14px 48px;
    ${title2}
  `,
};
