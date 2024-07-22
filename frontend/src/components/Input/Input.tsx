import styled from '@emotion/styled';
import { ChangeEvent, useCallback, useState } from 'react';

interface StyledProps extends React.InputHTMLAttributes<HTMLInputElement> {
  $width: keyof typeof widthSize;
  value: string;
  $color?: 'string';
}
const widthSize = { small: '45px', medium: '110px', large: '140px', full: '100%' };
const S = {
  Input: styled.input<StyledProps>`
    width: ${({ $width }) => widthSize[$width]};
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    height: 32px;
    color: ${({ $color, theme }) => ($color ? $color : theme.palette.grey300)};
    border: 2px solid;
    border-color: ${({ $color, theme }) => ($color ? $color : theme.palette.grey200)};
    border-radius: 10px;
    font-weight: ${({ theme }) => theme.text.weight.medium};
    font-size: ${({ theme }) => theme.text.size.small};
    font-color: ${({ $color, theme }) => ($color ? $color : theme.palette.black)};
    background-color: ${({ theme }) => theme.palette.white};
    padding: 6px 11px;
  `,
};

const Input = ({ value, $width, ...rest }: StyledProps) => {
  const [valueState, setValueState] = useState<string>(value);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValueState(event.target.value);
  }, []);

  return <S.Input value={valueState} $width={$width} {...rest} onChange={handleChange} />;
};

export default Input;
