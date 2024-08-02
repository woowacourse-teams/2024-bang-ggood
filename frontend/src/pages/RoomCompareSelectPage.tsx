import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { getChecklists } from '@/apis/checklist';
import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import CompareSelectCard from '@/components/RoomCompare/CompareSelectCard';
import useRoomCompareStore from '@/store/useRoomCompareStore';
import { flexRow } from '@/styles/common';
import theme from '@/styles/theme';
import { ChecklistPreview } from '@/types/checklist';

const RoomCompareSelectPage = () => {
  const { rooms, toggleRoom } = useRoomCompareStore();

  const [checklistList, setChecklistList] = useState<ChecklistPreview[]>([]);
  useEffect(() => {
    const fetchChecklist = async () => {
      const checklistList = await getChecklists();
      setChecklistList(checklistList);
    };

    fetchChecklist();
  }, []);

  return (
    <>
      <Header
        left={<Header.Backward />}
        center={<Header.Text>방 비교하기</Header.Text>}
        right={<Button label="비교" color="dark" size="small" />}
      />
      <S.Layout bgColor={theme.palette.grey100}>
        {checklistList.map(room => (
          <CompareSelectCard
            key={room.checklistId}
            isSelected={rooms.has(room.checklistId)}
            onClick={() => {
              toggleRoom(room.checklistId);
            }}
            roomName={room.roomName}
            location={room.address}
            deposit={room.deposit}
            rent={room.rent}
            createDate={new Date(room.createdAt)}
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
