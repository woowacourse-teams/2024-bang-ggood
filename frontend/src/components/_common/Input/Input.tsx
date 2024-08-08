import styled from '@emotion/styled';
import { ChangeEvent, useCallback } from 'react';

interface StyledProps extends React.InputHTMLAttributes<HTMLInputElement> {
  $color?: 'string';
}
const widthSize = {
  small: '45px',
  medium: '110px',
  large: '140px',
  full: '100%',
};

interface Props extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  width?: keyof typeof widthSize;
}
export type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const Input = ({
  width = 'full',
  value,
  onChange,
  ...rest
}: Props & { value?: string | number | undefined | null }) => {
  // value는 null을 허용하지않기때문에 확장
  const handleChange = useCallback(
    (event: InputChangeEvent) => {
      if (!onChange) return;
      onChange(event);
    },
    [onChange],
  );

  return <S.Input width={widthSize[width]} value={value ?? ''} {...rest} onChange={handleChange} />;
};
const S = {
  Input: styled.input<StyledProps>`
    ${({ width }) => width && `width: ${width};`};
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
