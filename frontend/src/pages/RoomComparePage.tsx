import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import { ROUTE_PATH } from '@/constants/routePath';
// import { getCompareRooms } from '@/apis/checklist';
// import Header from '@/components/common/Header/Header';
// import Layout from '@/components/common/layout/Layout';
// import CompareCard from '@/components/RoomCompare/CompareCard';
import { threeRoomsForCompare } from '@/mocks/fixtures/roomCompare';
import { flexRow } from '@/styles/common';
import theme from '@/styles/theme';
import { ChecklistCompare } from '@/types/checklistCompare';

const RoomComparePage = () => {
  const navigate = useNavigate();
  // const roomsId = { ...location.state };

  const [roomList, setRoomList] = useState<ChecklistCompare[]>(threeRoomsForCompare);

  const handleClickBackward = () => {
    navigate(ROUTE_PATH.checklistList);
  };

  return (
    <>
      <Header left={<Header.Backward onClick={handleClickBackward} />} />
      <Layout bgColor={theme.palette.grey50} withHeader>
        {/* <S.RoomGrid>{roomList?.map(room => <CompareCard key={room.checklistId} room={room} />)}</S.RoomGrid> */}
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
