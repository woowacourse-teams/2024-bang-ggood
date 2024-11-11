import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import CompareMap from '@/components/_common/Map/RoomCompareMap';
import CompareCard from '@/components/RoomCompare/CompareCard';
import RoomMarker from '@/components/RoomCompare/RoomMarker';
import { ROUTE_PATH } from '@/constants/routePath';
import { threeRoomsForCompare } from '@/mocks/fixtures/roomCompare';
import { flexCenter, flexRow } from '@/styles/common';
import theme from '@/styles/theme';
import { Position } from '@/types/address';
import { ChecklistCompare } from '@/types/checklistCompare';

const RoomComparePage = () => {
  const navigate = useNavigate();
  // const roomsId = { ...location.state };

  const [roomList, setRoomList] = useState<ChecklistCompare[]>(threeRoomsForCompare);

  const handleClickBackward = () => {
    navigate(ROUTE_PATH.checklistList);
  };
  const positions: Position[] = [
    { latitude: 37.5061912, longitude: 127.0019228 },
    { latitude: 37.5061912, longitude: 127.1266228 },
  ];

  return (
    <>
      <Header
        left={<Header.Backward onClick={handleClickBackward} />}
        center={<Header.Text>방 비교하기</Header.Text>}
      />
      <Layout bgColor={theme.palette.white} withHeader>
        <S.RoomGrid>
          <S.TitleFlex>
            <S.RoomTitle>
              <S.Title key={roomList[0].checklistId}>{roomList[0].roomName}</S.Title>
              <RoomMarker type={'A'} />
            </S.RoomTitle>
            <S.RoomTitle>
              <S.Title key={roomList[1].checklistId}>{roomList[1].roomName}</S.Title>
              <RoomMarker type={'B'} />
            </S.RoomTitle>
          </S.TitleFlex>
        </S.RoomGrid>
        <CompareMap positions={positions} />
        <S.RoomGrid>
          {roomList?.map((room, index) => <CompareCard key={room.checklistId} room={room} index={index} />)}
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
  TitleFlex: styled.div`
    display: flex;
    width: 100vw;
  `,
  RoomTitle: styled.div`
    width: 50%;
    margin-bottom: 0.5rem;
    ${flexCenter}
    gap:0.8rem;
  `,
  Title: styled.span`
    display: inline;
    padding: 0.8rem 0;

    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: 2rem;
    text-align: center;
    border-radius: 0.8rem;
  `,
};
