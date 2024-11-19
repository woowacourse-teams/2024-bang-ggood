import styled from '@emotion/styled';

import { flexCenter } from '@/styles/common';

type Size = 'medium' | 'small';

interface Props {
  text: string;
  backgroundColor: string;
  size: Size;
  onClick: () => void;
  isSquare: boolean;
}

const Badge = ({ text, backgroundColor, size = 'medium', onClick, isSquare }: Props) => {
  return (
    <S.RoomMarker size={size} backgroundColor={backgroundColor} onClick={onClick} isSquare={isSquare}>
      {text}
    </S.RoomMarker>
  );
};

const S = {
  RoomMarker: styled.span<{ backgroundColor: string; size: Size; isSquare: boolean }>`
    display: inline;
    width: ${({ size }) => (size === 'medium' ? '2.6rem' : '2rem')};
    height: ${({ size }) => (size === 'medium' ? '2.6rem' : '2rem')};

    ${flexCenter};
    flex-shrink: 0;

    background-color: ${({ backgroundColor }) => backgroundColor};

    color: white;
    border-radius: ${({ isSquare }) => (isSquare ? '0.8rem' : '50%')};

    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme, size }) => (size === 'medium' ? theme.text.size.medium : theme.text.size.xSmall)};
  `,
};

export default Badge;
