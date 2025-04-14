import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps, FunctionComponent, SVGProps } from 'react';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import { flexCenter } from '@/styles/common';
import theme from '@/styles/theme';
import { fontStyle } from '@/utils/fontStyle';

type ButtonVariant = 'contain' | 'outlined';
type ButtonSize = 'xSmall' | 'small' | 'medium' | 'full';
type ColorOption = 'light' | 'dark' | 'primary' | 'disabled';
type ButtonType = 'button' | 'submit' | 'reset';

interface Props extends ComponentProps<'button'> {
  type?: ButtonType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ColorOption;
  label: string;
  isSquare?: boolean; // TODO: rounded 로 props 변경 후 삭제
  rounded?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  Icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  id?: string;
}

const Button = ({
  size = 'medium',
  color = 'light',
  label,
  isSquare = false,
  rounded = false,
  onClick = () => {},
  disabled,
  type = 'button',
  variant = 'contain',
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
      rounded={rounded}
      onClick={color !== 'disabled' ? onClick : () => {}}
      onKeyDown={handleKeyDown}
      {...rest}
      disabled={disabled ?? false}
      aria-label={label}
      tabIndex={1}
      type={type}
      variant={variant}
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
  Button: styled.button<{
    size: ButtonSize;
    color: ColorOption;
    isSquare: boolean;
    rounded: boolean;
    disabled: boolean;
    variant: ButtonVariant;
  }>`
    ${({ isSquare }) => (isSquare ? 'border-radius: 0.5rem' : 'border-radius: 2.5rem')};
    ${({ rounded }) => (rounded ? 'border-radius: 2.5rem' : 'border-radius: 0.5rem')};
    ${({ size }) => sizeStyles[size]};
    ${({ color, disabled, variant }) => ColorStyles[disabled ? 'disabled' : variant === 'outlined' ? variant : color]};
    cursor: pointer;
    box-sizing: border-box;
    ${flexCenter}
    ${fontStyle(theme.font.body[1].B)};
  `,
  Text: styled.span<{ size: ButtonSize }>`
    ${flexCenter}
  `,
};

const ColorStyles = {
  light: css`
    background-color: ${theme.color.mono.white};

    color: ${theme.color.mono.black};

    &:hover,
    &:active {
      background-color: ${theme.color.gray[100]};
    }
  `,
  dark: css`
    background-color: ${theme.color.mono.black};

    color: ${theme.color.mono.white};

    &:hover,
    &:active {
      color: ${theme.color.gray[500]};
    }
  `,
  primary: css`
    background-color: ${theme.color.primary[500]};

    color: ${theme.color.mono.black};

    &:hover,
    &:active {
      background-color: ${theme.color.primary[600]};
    }
  `,
  outlined: css`
    border: 1px solid ${theme.color.primary[500]};

    background-color: ${theme.color.mono.white};

    color: ${theme.color.primary[500]};

    &:hover,
    &:active {
      background-color: ${theme.color.primary[100]};
    }
  `,
  disabled: css`
    background-color: ${theme.color.gray[200]};

    color: ${theme.color.gray[500]};
  `,
};

const sizeStyles = {
  xSmall: css`
    min-width: 7rem;
  `,
  small: css`
    min-width: 9rem;
    height: 2.5rem;
  `,
  medium: css`
    min-width: 10rem;
    height: 3rem;
  `,
  full: css`
    width: 100%;
    height: 3rem;
  `,
};
