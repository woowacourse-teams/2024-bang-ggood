import styled from '@emotion/styled';
import { useCallback } from 'react';

import { flexCenter } from '@/styles/common';
import { InputChangeEvent } from '@/types/event';

const widthSize = {
  small: '100px',
  medium: '160px',
  large: '300px',
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
    height: 40px;
    padding: 6px 11px;
    border: 2px solid ${({ $color, theme }) => ($color ? $color : theme.palette.grey200)};
    border-radius: 4px;

    color: ${({ $color, theme }) => ($color ? $color : theme.palette.grey600)};
    font-size: ${({ theme }) => theme.text.size.medium};
    outline-color: ${({ theme }) => theme.palette.grey400};
    ${flexCenter}
    box-sizing: border-box;
  `,
};
