import styled from '@emotion/styled';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import Layout from '@/components/common/layout/Layout';
import CompareCard from '@/components/RoomCompare/CompareCard';
import { flexRow } from '@/styles/common';
import { ChecklistCompare } from '@/types/checklist';

const RoomCompareSelectPage = () => {
  const location = useLocation();
  const roomsId = { ...location.state };

  const [roomList, setRoomList] = useState<ChecklistCompare[]>([]);

  return (
    <>
      <Header
        left={<Header.Backward />}
        center={<Header.Text>방 비교하기</Header.Text>}
        right={<Button label="비교" />}
      />{' '}
      <Layout>
        <S.RoomGrid>
          {/* TODO: Rank 없음으로 인해 count 전달 */}
          {roomList?.map((room, count) => <CompareCard key={room.checklistId} count={count} room={room} />)}
        </S.RoomGrid>
      </Layout>
    </>
  );
};

export default RoomCompareSelectPage;

const S = {
  RoomGrid: styled.div`
    ${flexRow}
  `,
};
