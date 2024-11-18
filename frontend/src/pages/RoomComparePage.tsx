import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import RoomCompareMap from '@/components/_common/Map/RoomCompareMap';
import CategoryDetailModal from '@/components/RoomCompare/CategoryDetailModal';
import CompareCard from '@/components/RoomCompare/CompareCard';
import OptionDetailModal from '@/components/RoomCompare/OptionDetailModal';
import RoomMarker from '@/components/RoomCompare/RoomMarker';
import { ROUTE_PATH } from '@/constants/routePath';
import useModal from '@/hooks/useModal';
import { roomsForCompare } from '@/mocks/fixtures/roomCompare';
import { flexCenter, flexRow } from '@/styles/common';
import theme from '@/styles/theme';
import { Position } from '@/types/address';
import { ChecklistCompare } from '@/types/checklistCompare';

const RoomComparePage = () => {
  const navigate = useNavigate();
  // const roomsId = { ...location.state };
  const { isModalOpen: isOptionModalOpen, openModal: openOptionModal, closeModal: closeOptionModal } = useModal();
  const { isModalOpen: isCategoryModalOpen, openModal: openCategoryModal, closeModal: closeCategoryModal } = useModal();

  const [roomList, setRoomList] = useState<ChecklistCompare[]>([]);

  //TODO: 나중에 비교 데이터 요청해서 받아오는 로직으로 수정
  useEffect(() => {
    setRoomList(roomsForCompare);
  });

  const handleOpenCategoryDetailModal = (roomId: number, categoryId: number) => {
    openCategoryModal();
    navigate(ROUTE_PATH.roomCompare + `?roomId=${roomId}&categoryId=${categoryId}`);
  };

  const handleCloseategoryDetailModal = () => {
    closeCategoryModal();
    navigate(ROUTE_PATH.roomCompare);
  };

  const handleClickBackward = () => {
    navigate(ROUTE_PATH.checklistList);
  };
  const positions: Position[] = [
    { latitude: 37.5061912, longitude: 127.0019228 },
    { latitude: 37.5061912, longitude: 127.1266228 },
  ];

  const optionMock = [
    { optionName: '세탁기', hasRoom1: true, hasRoom2: false },
    { optionName: '세탁기', hasRoom1: true, hasRoom2: false },
    { optionName: '세탁기', hasRoom1: true, hasRoom2: false },
    { optionName: '세탁기', hasRoom1: true, hasRoom2: false },
    { optionName: '세탁기', hasRoom1: true, hasRoom2: false },
    { optionName: '세탁기', hasRoom1: true, hasRoom2: false },
  ];

  if (!roomList.length) return <div>loading</div>;

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
        <RoomCompareMap positions={positions} />
        <S.RoomGrid>
          {roomList?.map((room, index) => (
            <CompareCard
              key={room.checklistId}
              room={room}
              index={index}
              openOptionModal={openOptionModal}
              openCategoryModal={handleOpenCategoryDetailModal}
            />
          ))}
        </S.RoomGrid>
        {/*방 옵션 비교 모달*/}
        {isOptionModalOpen && (
          <OptionDetailModal
            hasOptions={optionMock}
            roomTitle1={roomList[0].roomName ?? ''}
            roomTitle2={roomList[1].roomName ?? ''}
            isOpen={isOptionModalOpen}
            closeModal={closeOptionModal}
          />
        )}
        {/*방 카테고리 디테일 모달*/}
        {isCategoryModalOpen && (
          <CategoryDetailModal isOpen={isCategoryModalOpen} closeModal={handleCloseategoryDetailModal} />
        )}
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
    font-size: 1.8rem;
    text-align: center;
    border-radius: 0.8rem;
  `,
};
