import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useCallback } from 'react';

import { CloseIcon } from '@/assets/assets';
import { flexCenter } from '@/styles/common';
import theme from '@/styles/theme';
import { InputChangeEvent } from '@/types/event';
import { fontStyle } from '@/utils/fontStyle';

const widthSize = {
  small: '10rem',
  medium: '16rem',
  large: '30rem',
  full: '100%',
};

interface Props extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  width?: keyof typeof widthSize;
  variant?: 'default' | 'no-border' | 'fill-white';
  isError?: boolean;
}

const Input = ({ width = 'full', value, onChange, variant = 'default', disabled, isError = false, ...rest }: Props) => {
  const handleChange = useCallback(
    (event: InputChangeEvent) => {
      if (!onChange) return;
      onChange(event);
    },
    [onChange],
  );

  return (
    <div style={{ position: 'relative' }}>
      <S.Input
        value={value}
        {...rest}
        onChange={handleChange}
        $variant={isError ? 'error' : (variant ?? 'default')}
        disabled={disabled}
      />
      {isError && (
        <div
          style={{
            position: 'absolute',
            right: '1rem',
            fontSize: '2rem',
            top: 'calc(50%)',
            transform: 'translate(0,-50%)',
          }}
        >
          <CloseIcon fill={theme.color.red[300]} />
        </div>
      )}
    </div>
  );
};

export default Input;

interface StyledProps extends React.InputHTMLAttributes<HTMLInputElement> {
  $variant: 'default' | 'error' | 'no-border' | 'fill-white';
}

const variantStyle = {
  default: css`
    color: ${theme.color.gray[400]};
    border-color: ${theme.color.gray[300]};
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
    width:100%;
    height: 5rem;
    padding: 0.6rem 1.1rem;
    border: 0.1rem solid;
    border-radius: 0.8rem;

    background-color: transparent;

    color: ${theme.color.mono.black};

    box-sizing: border-box;

    ${({ $variant, disabled }) => variantStyle[disabled ? 'disabled' : $variant]};
    ${({ theme }) => fontStyle(theme.font.body[1].R)};
  `,
};
