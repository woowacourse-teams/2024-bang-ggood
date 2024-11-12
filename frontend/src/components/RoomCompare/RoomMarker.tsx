import styled from '@emotion/styled';

import { flexCenter } from '@/styles/common';

type Size = 'medium' | 'small';
const RoomMarker = ({ type, size = 'medium', onClick }: { type: 'A' | 'B'; size?: Size; onClick?: () => void }) => {
  return (
    <S.RoomMarker size={size} type={type} onClick={onClick}>
      {type}
    </S.RoomMarker>
  );
};

const S = {
  RoomMarker: styled.span<{ type: string; size: Size }>`
    display: inline;
    width: ${({ size }) => (size === 'medium' ? '2.6rem' : '2rem')};
    height: ${({ size }) => (size === 'medium' ? '2.6rem' : '2rem')};

    ${flexCenter};
    flex-shrink: 0;

    background-color: ${({ type, theme }) => (type === 'A' ? theme.palette.yellow600 : theme.palette.green600)};

    color: white;
    border-radius: 50%;

    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme, size }) => (size === 'medium' ? theme.text.size.medium : theme.text.size.xSmall)};
  `,
};

export default RoomMarker;
