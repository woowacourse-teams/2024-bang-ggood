import styled from '@emotion/styled';
import { useCallback } from 'react';

import { flexCenter } from '@/styles/common';
import { InputChangeEvent } from '@/types/event';

const widthSize = {
  xSmall: '6rem',
  small: '10rem',
  medium: '16rem',
  large: '30rem',
  full: '100%',
};

interface Props extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  width?: keyof typeof widthSize;
}

const Input = ({ width = 'full', value, onChange, ...rest }: Props) => {
  const handleChange = useCallback(
    (event: InputChangeEvent) => {
      if (!onChange) return;
      onChange(event);
    },
    [onChange],
  );

  return <S.Input width={widthSize[width]} value={value} {...rest} onChange={handleChange} />;
};

export default Input;

interface StyledProps extends React.InputHTMLAttributes<HTMLInputElement> {
  $color?: 'string';
}

const S = {
  Input: styled.input<StyledProps>`
    width: ${({ width }) => width};
    height: 4rem;
    padding: 0.6rem 1.1rem;
    border: 0.2rem solid ${({ $color, theme }) => ($color ? $color : theme.palette.grey200)};
    border-radius: 0.4rem;

    color: ${({ $color, theme }) => ($color ? $color : theme.palette.grey600)};
    font-size: ${({ theme }) => theme.text.size.medium};
    outline-color: ${({ theme }) => theme.palette.grey400};
    ${flexCenter}
    box-sizing: border-box;
  `,
};
