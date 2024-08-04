import styled from '@emotion/styled';
import { ChangeEvent, useCallback } from 'react';

interface StyledProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  $color?: 'string';
  $borderRadius: string;
}
const widthSize: Record<string, string> = {
  small: '45px',
  medium: '110px',
  large: '140px',
  full: '100%',
};

const heightSize: Record<string, string> = {
  small: '32px',
  medium: '100px',
  large: '180px',
  full: '100%',
};

interface Props extends React.TextareaHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  width?: keyof typeof widthSize;
  height?: keyof typeof heightSize;
  borderRadius?: string;
}

export type TextareaChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const Textarea = ({ width = 'full', height = 'small', onChange, borderRadius = '5px', ...rest }: Props) => {
  const handleChange = useCallback(
    (event: TextareaChangeEvent) => {
      if (!onChange) return;
      onChange(event);
    },
    [onChange],
  );

  return (
    <S.Textarea
      width={widthSize[width]}
      height={heightSize[height]}
      {...rest}
      onChange={handleChange}
      $borderRadius={borderRadius}
    />
  );
};
const S = {
  Textarea: styled.textarea<StyledProps>`
    ${({ width }) => width && `width: ${width};`};
    ${({ height }) => height && `height: ${height};`};
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
    border-radius: ${({ $borderRadius }) => $borderRadius && $borderRadius};
  `,
};
export default Textarea;
