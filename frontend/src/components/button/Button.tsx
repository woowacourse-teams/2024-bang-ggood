import styled from '@emotion/styled';

import { title2, title3, title4 } from '@/styles/common';
import theme from '@/styles/theme';

type ButtonSize = 'small' | 'medium' | 'full';
type ColorOption = 'light' | 'dark' | 'disabled';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  type?: ButtonSize;
  color?: ColorOption;
  text: string;
  square?: boolean;
  onClick?: () => void;
}

const RoundButton = ({ type = 'medium', color = 'light', text, square = false, onClick = () => {} }: Props) => {
  return (
    <S.Button size={type} color={color} square={square} onClick={color !== 'disabled' ? onClick : () => {}}>
      {text}
    </S.Button>
  );
};

export default RoundButton;

const S = {
  Button: styled.button<{ size: ButtonSize; color: ColorOption; square: boolean }>`
    ${({ square }) => (square ? 'border-radius: 8px' : 'border-radius: 100px')};
    ${({ size }) => sizeStyles[size]};
    ${({ color }) => ColorStyles[color]};
    cursor: pointer;
  `,
};

const ColorStyles = {
  light: `
    background-color: ${theme.palette.grey100};
    color: ${theme.palette.black};

    &:hover, &:active {
      background-color: ${theme.palette.grey200};
    }
  `,
  dark: `
    background-color: ${theme.palette.black};
    color: ${theme.palette.white};

    &:hover, &:active {
      background-color: ${theme.palette.grey600};
    }
  `,
  disabled: `
    background-color: ${theme.palette.grey200};
    color: ${theme.palette.grey400};
  `,
};

const sizeStyles = {
  small: `
    padding: 10px 24px;
    ${title4}
  `,
  medium: `
    padding: 12px 48px;
    ${title3}
  `,
  full: `
    width: 100%;
    padding: 14px 48px;
    ${title2}
  `,
};
