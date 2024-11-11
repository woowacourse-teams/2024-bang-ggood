import styled from '@emotion/styled';

import { flexCenter, title2 } from '@/styles/common';

const RoomMarker = ({ type, onClick }: { type: 'A' | 'B'; onClick?: () => void }) => {
  return (
    <S.RoomMarker type={type} onClick={onClick}>
      {type}
    </S.RoomMarker>
  );
};

const S = {
  RoomMarker: styled.span<{ type: string }>`
    display: inline;
    width: 3rem;
    height: 3rem;

    ${flexCenter};
    flex-shrink: 0;

    background-color: ${({ type, theme }) => (type === 'A' ? theme.palette.yellow600 : theme.palette.green600)};
    border-radius: 50%;

    ${title2}
    color: white;
  `,
};

export default RoomMarker;
