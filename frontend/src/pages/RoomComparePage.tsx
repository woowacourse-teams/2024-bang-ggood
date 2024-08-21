import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { getCompareRooms } from '@/apis/checklist';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import CompareCard from '@/components/RoomCompare/CompareCard';
import useRoomCompareStore from '@/store/useRoomCompareStore';
import { flexRow } from '@/styles/common';
import { ChecklistCompare } from '@/types/checklist';

const RoomComparePage = () => {
  const { rooms } = useRoomCompareStore();

  const [roomList, setRoomList] = useState<ChecklistCompare[]>([]);

  useEffect(() => {
    const fetchCompareRoomList = async () => {
      const roomArray = Array.from(rooms);

      const [id1, id2, id3] = roomArray;
      const compareList = await getCompareRooms({ id1, id2, id3: id3 !== undefined ? id3 : undefined });

      if (compareList.length === 3) {
        setRoomList(compareList);
      } else setRoomList(compareList);
    };
    fetchCompareRoomList();
  }, [rooms]);

  return (
    <>
      <Header left={<Header.Backward />} center={<Header.Text>방 비교하기</Header.Text>} />
      <Layout>
        <S.RoomGrid>
          {roomList?.map(room => <CompareCard key={room.checklistId} roomInfo={room} compareNum={roomList.length} />)}
        </S.RoomGrid>
      </Layout>
    </>
  );
};

export default RoomComparePage;

const S = {
  RoomGrid: styled.div`
    ${flexRow}
  `,
};
