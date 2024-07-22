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
    display: flex;
    width: ${({ $width }) => widthSize[$width]};
    height: 32px;
    padding: 6px 11px;
    border: 2px solid;

    background-color: ${({ theme }) => theme.palette.white};

    color: ${({ $color, theme }) => ($color ? $color : theme.palette.grey300)};
    font-weight: ${({ theme }) => theme.text.weight.medium};
    font-size: ${({ theme }) => theme.text.size.small};
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-color: ${({ $color, theme }) => ($color ? $color : theme.palette.grey200)};
    border-radius: 10px;
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
