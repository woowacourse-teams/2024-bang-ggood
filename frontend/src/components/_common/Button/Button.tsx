import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps, FunctionComponent, SVGProps } from 'react';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import { flexCenter, title3, title4 } from '@/styles/common';
import theme from '@/styles/theme';

type ButtonSize = 'xSmall' | 'small' | 'medium' | 'full';
type ColorOption = 'light' | 'dark' | 'primary' | 'disabled';
type ButtonType = 'button' | 'submit' | 'reset';

interface Props extends ComponentProps<'button'> {
  size?: ButtonSize;
  color?: ColorOption;
  label: string;
  isSquare?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  Icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  id?: string;
  type?: ButtonType;
}

const Button = ({
  size = 'medium',
  color = 'light',
  label,
  isSquare = false,
  onClick = () => {},
  disabled,
  type = 'button',
  id,
  Icon,
  ...rest
}: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <S.Button
      id={id}
      size={size}
      color={color}
      isSquare={isSquare}
      onClick={color !== 'disabled' ? onClick : () => {}}
      onKeyDown={handleKeyDown}
      {...rest}
      disabled={disabled ?? false}
      aria-label={label}
      tabIndex={1}
      type={type}
    >
      <FlexBox.Horizontal>
        {Icon && <Icon aria-hidden="true" />}
        <S.Text size={size}>{label}</S.Text>
      </FlexBox.Horizontal>
    </S.Button>
  );
};

export default Button;

const S = {
  Button: styled.button<{ size: ButtonSize; color: ColorOption; isSquare: boolean; disabled: boolean }>`
    ${({ isSquare }) => (isSquare ? 'border-radius: 0.4rem' : 'border-radius: 10rem')};
    ${({ size }) => sizeStyles[size]};
    ${({ color, disabled }) => ColorStyles[disabled ? 'disabled' : color]};
    cursor: pointer;
    box-sizing: border-box;
    ${flexCenter}
  `,
  Text: styled.span<{ size: ButtonSize }>`
    ${flexCenter}
    min-width: ${({ size }) => (size === 'full' ? '10rem' : '3rem')};
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
  primary: css`
    background-color: ${theme.palette.yellow500};

    color: ${theme.palette.grey600};

    &:hover,
    &:active {
      background-color: ${theme.palette.yellow600};
    }
  `,
  disabled: css`
    background-color: ${theme.palette.grey200};

    color: ${theme.palette.grey400};
  `,
};

const sizeStyles = {
  xSmall: css`
    padding: 0.8rem 1.2rem;
    ${title4}
    min-width: 7rem;
  `,
  small: css`
    padding: 0.8rem 1.2rem;
    ${title3}
  `,
  medium: css`
    padding: 1rem 1.8rem;
    ${title4}
  `,
  full: css`
    width: 100%;
    padding: 1.2rem 1rem;
    ${title4}
  `,
};
