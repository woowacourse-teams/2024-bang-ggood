import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getCompareRooms } from '@/apis/checklist';
import Header from '@/components/common/Header/Header';
import Layout from '@/components/common/layout/Layout';
import CompareCard from '@/components/RoomCompare/CompareCard';
import { flexRow } from '@/styles/common';
import { ChecklistCompare } from '@/types/checklist';

const RoomComparePage = () => {
  const location = useLocation();
  const roomsId = { ...location.state };

  const [roomList, setRoomList] = useState<ChecklistCompare[]>([]);

  useEffect(() => {
    const fetchCompareRoomList = async () => {
      const compareList = await getCompareRooms(roomsId);
      if (compareList.length === 3) {
        // TODO: 백엔드 랭킹 API 수정 이후 코드
        // const desiredOrder = [2, 1, 3];
        // const sortedList = desiredOrder.map(rank => compareList.find((item: ChecklistCompare) => item.rank === rank));
        // setRoomList(sortedList);

        // 대체 코드
        setRoomList([compareList[1], compareList[0], compareList[2]]);
      } else setRoomList(compareList);
    };
    fetchCompareRoomList();
  }, []);

  return (
    <>
      <Header left={<Header.Backward />} />
      <Layout>
        <S.RoomGrid>{roomList?.map(room => <CompareCard key={room.checklistId} room={room} />)}</S.RoomGrid>
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
