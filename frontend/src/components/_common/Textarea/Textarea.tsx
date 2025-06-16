import styled from '@emotion/styled';
import { ChangeEvent, useCallback, useEffect, useRef } from 'react';

import { flexCenter } from '@/styles/common';

interface StyledProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  $color?: 'string';
  $borderRadius: string;
  $transparent: boolean;
}
const widthSize: Record<string, string> = {
  small: '4.5rem',
  medium: '11rem',
  large: '14rem',
  full: '100%',
};

const heightSize: Record<string, string> = {
  small: '6.4rem',
  medium: '12rem',
  large: '30rem',
  full: '100%',
};

interface Props extends React.TextareaHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  width?: keyof typeof widthSize;
  height?: keyof typeof heightSize;
  borderRadius?: string;
  hasBorder?: boolean;
  transparent?: boolean;
}

export type TextareaChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const Textarea = ({
  width = 'full',
  height = 'small',
  onChange,
  borderRadius = '.5rem',
  hasBorder = false,
  transparent = false,
  ...rest
}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = useCallback(
    (event: TextareaChangeEvent) => {
      if (!onChange) return;

      onChange(event);
    },
    [onChange],
  );

  useEffect(() => {
    if (textareaRef.current) {
      const length = textareaRef.current.value.length;
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(length, length);
    }
  }, []);

  return (
    <S.Box hasBorder={hasBorder}>
      <S.Textarea
        ref={textareaRef}
        width={widthSize[width]}
        height={heightSize[height]}
        {...rest}
        onChange={handleChange}
        $borderRadius={borderRadius}
        $transparent={transparent}
      />
    </S.Box>
  );
};

const S = {
  Box: styled.div<{ hasBorder: boolean }>`
    border: ${({ hasBorder, theme }) => hasBorder && `.2rem solid ${theme.palette.grey200}`};
    border-radius: 0.5rem;
  `,
  Textarea: styled.textarea<StyledProps>`
    ${({ width }) => width && `width: ${width};`};
    ${({ height }) => height && `height: ${height};`};
    padding: 0.6rem 1.1rem;

    background-color: ${({ theme, $transparent }) => ($transparent ? 'transparent' : theme.color.mono.white)};

    color: ${({ $color, theme }) => ($color ? $color : theme.palette.grey600)};
    font-weight: ${({ theme }) => theme.text.weight.medium};
    font-size: ${({ theme }) => theme.text.size.medium};
    outline-color: ${({ theme }) => theme.palette.grey300};

    ${flexCenter}
    box-sizing: border-box;
    border-radius: ${({ $borderRadius }) => $borderRadius && $borderRadius};
  `,
};
export default Textarea;
