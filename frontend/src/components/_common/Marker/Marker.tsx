import styled from '@emotion/styled';

import { flexCenter } from '@/styles/common';

type Size = 'medium' | 'small';

interface Props {
  text: string;
  backgroundColor: string;
  size?: Size;
  isCircle: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const Marker = ({ disabled = false, isCircle, text, backgroundColor, size = 'medium', onClick }: Props) => {
  const sharedProps = {
    disabled,
    isCircle,
    size,
    backgroundColor,
  };

  return (
    <S.Button {...sharedProps} onClick={onClick} disabled={disabled}>
      <S.Text size={size}>{text}</S.Text>
    </S.Button>
  );
};

const sizeMap = { small: '1.4rem', medium: '2rem' };

const S = {
  Box: styled.span<{ isCircle: boolean; size: Size; backgroundColor: string }>`
    ${flexCenter}
    display: inline-block;
    width: ${({ isCircle, size }) => isCircle && sizeMap[size]};
    height: ${({ isCircle, size }) => isCircle && sizeMap[size]};
    padding: ${({ isCircle }) => (isCircle ? '0.3rem' : '0.3rem 0.6rem')};
    border-radius: 2rem;

    background-color: ${({ backgroundColor }) => backgroundColor};

    text-align: center;
  `,
  Button: styled.button<{ isCircle: boolean; size: Size; backgroundColor: string; disabled: boolean }>`
    ${flexCenter}
    display: inline-block;
    width: ${({ isCircle, size }) => isCircle && sizeMap[size]};
    height: ${({ isCircle, size }) => isCircle && sizeMap[size]};
    padding: ${({ isCircle }) => (isCircle ? '0.3rem' : '0.3rem 0.6rem')};
    border-radius: 2rem;

    background-color: ${({ theme, backgroundColor, disabled }) => (disabled ? theme.palette.grey300 : backgroundColor)};

    text-align: center;
  `,
  Text: styled.span<{ size: Size }>`
    width: 100%;
    height: 100%;

    ${flexCenter};
    color: ${({ theme }) => theme.palette.white};
    font-weight: ${({ theme }) => theme.text.weight.semiBold};
    font-size: ${({ theme, size }) => (size === 'small' ? theme.text.size.xSmall : theme.text.size.small)};
  `,
};

export default Marker;
