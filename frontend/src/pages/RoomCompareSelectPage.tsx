import styled from '@emotion/styled';

import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import CompareSelectCard from '@/components/RoomCompare/CompareSelectCard';
import useRoomCompareStore from '@/store/useRoomCompareStore';
import { flexRow } from '@/styles/common';
import theme from '@/styles/theme';

const RoomCompareSelectPage = () => {
  const { rooms, toggleRoom } = useRoomCompareStore();
  const roomList = [1, 2, 3];
  return (
    <>
      <Header
        left={<Header.Backward />}
        center={<Header.Text>방 비교하기</Header.Text>}
        right={<Button label="비교" color="dark" size="small" />}
      />
      <S.Layout bgColor={theme.palette.grey100}>
        {roomList.map(room => (
          <CompareSelectCard
            key={room}
            isSelected={rooms.has(room)}
            onClick={() => {
              toggleRoom(room);
            }}
          />
        ))}
      </S.Layout>
    </>
  );
};

export default RoomCompareSelectPage;

const S = {
  RoomGrid: styled.div`
    ${flexRow}
  `,
  Layout: styled.div<{ bgColor: string }>`
    display: flex;
    padding: 16px;

    background-color: ${({ bgColor }) => bgColor};
    overflow-y: scroll;
    flex-direction: column;
    row-gap: 10px;
  `,
};
