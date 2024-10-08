import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FunctionComponent, SVGProps } from 'react';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import { flexCenter, title3, title4 } from '@/styles/common';
import theme from '@/styles/theme';

type ButtonSize = 'xSmall' | 'small' | 'medium' | 'full';
type ColorOption = 'light' | 'dark' | 'disabled';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  color?: ColorOption;
  label: string;
  isSquare?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  Icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
}

const Button = ({
  size = 'medium',
  color = 'light',
  label,
  isSquare = false,
  onClick = () => {},
  disabled,
  Icon,
  ...rest
}: Props) => {
  return (
    <S.Button
      size={size}
      color={color}
      isSquare={isSquare}
      onClick={color !== 'disabled' ? onClick : () => {}}
      {...rest}
      disabled={disabled}
    >
      <FlexBox.Horizontal>
        {Icon && <Icon />}
        <S.Text size={size}>{label}</S.Text>
      </FlexBox.Horizontal>
    </S.Button>
  );
};

export default Button;

const S = {
  Button: styled.button<{ size: ButtonSize; color: ColorOption; isSquare: boolean }>`
    ${({ isSquare }) => (isSquare ? 'border-radius: 0.4rem' : 'border-radius: 10rem')};
    ${({ size }) => sizeStyles[size]};
    ${({ color }) => ColorStyles[color]};
    cursor: pointer;
    box-sizing: border-box;
    ${flexCenter}
  `,
  Text: styled.span<{ size: ButtonSize }>`
    ${flexCenter}
    min-width: ${({ size }) => size === 'full' && 8}rem;
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
    background-color: ${theme.palette.grey600};

    color: ${theme.palette.white};

    &:hover,
    &:active {
      background-color: ${theme.palette.black};
    }
  `,
  disabled: css`
    background-color: ${theme.palette.grey200};

    color: ${theme.palette.grey400};
  `,
};

const sizeStyles = {
  xSmall: css`
    padding: 0.8rem 1.5rem;
    ${title4}
    min-width:7rem;
  `,
  small: css`
    padding: 1rem 2rem;
    ${title4}
  `,
  medium: css`
    padding: 1.2rem 2.4rem;
    ${title3}
  `,
  full: css`
    width: 100%;
    padding: 1.4rem 2rem;
    ${title3}
  `,
};
