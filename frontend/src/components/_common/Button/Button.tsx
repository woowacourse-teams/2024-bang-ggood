import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps, FunctionComponent, SVGProps } from 'react';

import FlexBox from '@/components/_common/FlexBox/FlexBox';
import { flexCenter } from '@/styles/common';
import theme from '@/styles/theme';
import { fontStyle } from '@/utils/fontStyle';

type ButtonVariant = 'text' | 'contain' | 'outlined' | 'outlined-gray';
type ButtonSize = 'xSmall' | 'small' | 'medium' | 'full' | 'header';
type ColorOption = 'light' | 'dark' | 'primary';
type ButtonType = 'button' | 'submit' | 'reset';

interface Props extends ComponentProps<'button'> {
  type?: ButtonType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ColorOption;
  label: React.ReactNode;
  isSquare?: boolean; // TODO: rounded 로 props 변경 후 삭제
  rounded?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  Icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  iconPosition?: 'start' | 'end';
  id?: string;
}

const Button = ({
  type = 'button',
  variant = 'contain',
  size = 'medium',
  color = 'light',
  label,
  isSquare = false,
  rounded = false,
  onClick = () => {},
  disabled = false,
  Icon,
  iconPosition = 'start',
  id,
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
      onClick={disabled ? () => {} : onClick}
      onKeyDown={handleKeyDown}
      {...rest}
      disabled={disabled ?? false}
      aria-label={typeof label === 'string' ? label : undefined}
      type={type}
      variant={variant}
    >
      <FlexBox.Horizontal>
        {iconPosition === 'start' && Icon && <Icon aria-hidden="true" />}
        <S.Text>{label}</S.Text>
        {iconPosition === 'end' && Icon && <Icon aria-hidden="true" />}
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
    ${({ rounded }) => (rounded ? 'border-radius: 4rem' : 'border-radius: 0.8rem')};
    ${({ size }) => sizeStyles[size]};
    ${({ color, disabled, variant }) => getColorStyles({ color, disabled, variant })};
    cursor: pointer;
    box-sizing: border-box;
    ${flexCenter}
  `,
  Text: styled.span`
    ${flexCenter}
    ${fontStyle(theme.font.body[1].B)};
    min-width: fit-content;
    cursor: pointer;
  `,
};

const getColorStyles = ({
  color,
  disabled,
  variant,
}: {
  color: ColorOption;
  disabled: boolean;
  variant: ButtonVariant;
}) => {
  if (disabled) {
    return css`
      background-color: ${theme.color.gray[200]};

      color: ${theme.color.gray[500]};
      cursor: not-allowed;
    `;
  }

  if (variant === 'text') {
    return css`
      color: ${theme.color.mono.black};

      &:hover,
      &:active {
        background-color: ${theme.color.gray[100]};
      }
    `;
  }

  if (color === 'light' && variant === 'contain') {
    return css`
      background-color: ${theme.color.mono.white};

      color: ${theme.color.mono.black};

      &:hover,
      &:active {
        background-color: ${theme.color.gray[100]};
      }
    `;
  }
  if (color === 'light' && variant === 'outlined-gray') {
    return css`
      border: 1px solid ${theme.color.gray[200]};

      background-color: ${theme.color.mono.white};

      color: ${theme.color.mono.black};

      &:hover,
      &:active {
        background-color: ${theme.color.gray[100]};
      }
    `;
  }

  if (color === 'dark' && variant === 'contain') {
    return css`
      background-color: ${theme.color.mono.black};

      color: ${theme.color.mono.white};

      &:hover,
      &:active {
        color: ${theme.color.gray[500]};
      }
    `;
  }

  if (color === 'primary' && variant === 'contain') {
    return css`
      background-color: ${theme.color.primary[500]};

      color: ${theme.color.mono.black};

      &:hover,
      &:active {
        background-color: ${theme.color.primary[600]};
      }
    `;
  }

  if (color === 'primary' && variant === 'outlined') {
    return css`
      border: 1px solid ${theme.color.primary[500]};

      background-color: ${theme.color.mono.white};

      color: ${theme.color.primary[500]};

      &:hover,
      &:active {
        background-color: ${theme.color.primary[100]};
      }
    `;
  }

  if (variant === 'outlined') {
    return css`
      border: 1px solid ${theme.color.gray[200]};

      background-color: ${theme.color.mono.white};

      color: ${theme.color.mono.black};

      &:hover,
      &:active {
        background-color: ${theme.color.gray[200]};
      }
    `;
  }
};

const sizeStyles = {
  xSmall: css`
    min-width: 10rem;
    height: 4rem;
  `,
  small: css`
    min-width: 14rem;
    height: 4rem;
  `,
  medium: css`
    min-width: 17rem;
    height: 4.8rem;
  `,
  full: css`
    width: 100%;
    height: 4.8rem;
  `,
  header: css`
    width: fit-content;
    height: 4rem;
    padding: 0.5rem;
  `,
};
