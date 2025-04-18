import styled from '@emotion/styled';
import { useCallback } from 'react';

import { flexCenter } from '@/styles/common';
import theme from '@/styles/theme';
import { InputChangeEvent } from '@/types/event';
import { css } from '@emotion/react';

const widthSize = {
  small: '10rem',
  medium: '16rem',
  large: '30rem',
  full: '100%',
};

interface Props extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  width?: keyof typeof widthSize;
  variant?: 'default' | 'error' | 'no-border' | 'fill-white';
}

const Input = ({ width = 'full', value, onChange, variant = 'default', disabled, ...rest }: Props) => {
  const handleChange = useCallback(
    (event: InputChangeEvent) => {
      if (!onChange) return;
      onChange(event);
    },
    [onChange],
  );

  return (
    <S.Input
      width={widthSize[width]}
      value={value}
      {...rest}
      onChange={handleChange}
      $variant={variant ?? 'default'}
      disabled={disabled}
    />
  );
};

export default Input;

interface StyledProps extends React.InputHTMLAttributes<HTMLInputElement> {
  $variant: 'default' | 'error' | 'no-border' | 'fill-white';
}

const variantStyle = {
  default: css`
    border-color: ${theme.color.gray[600]};
  `,
  error: css`
    border-color: ${theme.color.red[300]};
  `,
  'no-border': css`
    border-color: transparent;
  `,
  disabled: css`
    color: ${theme.color.gray[400]};
    border-color: ${theme.color.gray[300]};
  `,
  'fill-white': css`
    background-color: ${theme.color.mono.white};
    border-color: transparent;
  `,
};

const S = {
  Input: styled.input<StyledProps>`
    ${flexCenter}
    /* width: ${({ width }) => width}; */
    height: 5rem;
    padding: 0.6rem 1.1rem;
    border: 0.1rem solid;
    border-radius: 0.8rem;

    background-color: transparent;

    color: ${theme.color.mono.black};

    box-sizing: border-box;

    ${({ $variant, disabled }) => variantStyle[disabled ? 'disabled' : $variant]};
  `,
};
