import styled from '@emotion/styled';

import { flexCenter } from '@/styles/common';
import { fontStyle } from '@/utils/fontStyle';

type Size = 'medium' | 'small';

interface Props {
  text: string;
  color: string;
  size?: Size;
  isCircle: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const Marker = ({ disabled = false, isCircle, text, color, size = 'medium', onClick }: Props) => {
  const sharedProps = {
    disabled,
    isCircle,
    size,
    color,
  };

  return (
    <S.Button {...sharedProps} onClick={onClick} disabled={disabled}>
      <S.Text size={size}>{text}</S.Text>
    </S.Button>
  );
};

const sizeMap = { small: '2rem', medium: '2.4rem' };

const S = {
  Button: styled.button<{ isCircle: boolean; size: Size; color: string; disabled: boolean }>`
    ${flexCenter}
    display: inline-block;
    width: ${({ isCircle, size }) => isCircle && sizeMap[size]};
    height: ${({ isCircle, size }) => isCircle && sizeMap[size]};
    padding: ${({ isCircle }) => (isCircle ? '0.6rem' : '0.3rem 0.6rem')};
    border-radius: 2.5rem;

    background-color: ${({ theme, color, disabled }) => (disabled ? theme.color.primary[500] : color)};

    text-align: center;
  `,
  Text: styled.span<{ size: Size }>`
    width: 100%;
    height: 100%;

    ${flexCenter};

    ${({ theme, size }) => (size === 'small' ? fontStyle(theme.font.caption[1].B) : fontStyle(theme.font.label[1].B))}
    color: ${({ theme }) => theme.color.mono.white};
  `,
};

export default Marker;
