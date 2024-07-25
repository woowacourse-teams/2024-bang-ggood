import styled from '@emotion/styled';
import { ChangeEvent, useCallback } from 'react';

interface StyledProps extends React.InputHTMLAttributes<HTMLInputElement> {
  $color?: 'string';
}
const widthSize = { small: '45px', medium: '110px', large: '140px', full: '100%' };

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  width: keyof typeof widthSize;
}

const Input = ({ width, onChange, ...rest }: Props) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!onChange) return;
      onChange(event);
    },
    [onChange],
  );

  return <S.Input width={widthSize[width]} {...rest} onChange={handleChange} />;
};
const S = {
  Input: styled.input<StyledProps>`
    display: flex;
    width: ${({ width }) => width};
    height: 32px;
    padding: 6px 11px;
    border: 1px solid ${({ $color, theme }) => ($color ? $color : theme.palette.grey100)};

    background-color: ${({ theme }) => theme.palette.grey100};

    color: ${({ $color, theme }) => ($color ? $color : theme.palette.grey600)};
    font-weight: ${({ theme }) => theme.text.weight.medium};
    font-size: ${({ theme }) => theme.text.size.small};
    outline-color: ${({ theme }) => theme.palette.grey300};
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  `,
};
export default Input;
