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
  small: '64px',
  medium: '120px',
  large: '300px',
  full: '100%',
};

interface Props extends React.TextareaHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  width?: keyof typeof widthSize;
  height?: keyof typeof heightSize;
  borderRadius?: string;
  hasBorder?: boolean;
}

export type TextareaChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const Textarea = ({
  width = 'full',
  height = 'small',
  onChange,
  borderRadius = '5px',
  hasBorder = false,
  ...rest
}: Props) => {
  const handleChange = useCallback(
    (event: TextareaChangeEvent) => {
      if (!onChange) return;
      onChange(event);
    },
    [onChange],
  );

  return (
    <S.Box hasBorder={hasBorder}>
      <S.Textarea
        width={widthSize[width]}
        height={heightSize[height]}
        {...rest}
        onChange={handleChange}
        $borderRadius={borderRadius}
      />
    </S.Box>
  );
};
const S = {
  Box: styled.div<{ hasBorder: boolean }>`
    border: ${({ hasBorder, theme }) => hasBorder && `2px solid ${theme.palette.grey200}`};
    border-radius: 5px;
  `,
  Textarea: styled.textarea<StyledProps>`
    ${({ width }) => width && `width: ${width};`};
    ${({ height }) => height && `height: ${height};`};
    padding: 6px 11px;

    background-color: ${({ theme }) => theme.palette.white};

    color: ${({ $color, theme }) => ($color ? $color : theme.palette.grey600)};
    font-weight: ${({ theme }) => theme.text.weight.medium};
    font-size: ${({ theme }) => theme.text.size.medium};
    outline-color: ${({ theme }) => theme.palette.grey300};
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-radius: ${({ $borderRadius }) => $borderRadius && $borderRadius};
  `,
};
export default Textarea;
