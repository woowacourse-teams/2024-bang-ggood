import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import RoomCompareMap from '@/components/_common/Map/RoomCompareMap';
import CategoryDetailModal from '@/components/RoomCompare/CategoryDetailModal';
import CompareCard from '@/components/RoomCompare/CompareCard';
import OptionDetailModal from '@/components/RoomCompare/OptionDetailModal';
import RoomMarker from '@/components/RoomCompare/RoomMarker';
import { OPTIONS } from '@/constants/options';
import { ROUTE_PATH } from '@/constants/routePath';
import useGetCompareRoomsQuery from '@/hooks/query/useGetCompareRoomsQuery';
import useModal from '@/hooks/useModal';
import { flexCenter, flexRow } from '@/styles/common';
import theme from '@/styles/theme';
import { Position } from '@/types/address';

export interface OptionDetail {
  optionId: number;
  optionName: string;
  hasOption: [boolean, boolean];
}

const RoomComparePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const roomsIds = { ...location.state };
  const { isModalOpen: isOptionModalOpen, openModal: openOptionModal, closeModal: closeOptionModal } = useModal();
  const { isModalOpen: isCategoryModalOpen, openModal: openCategoryModal, closeModal: closeCategoryModal } = useModal();

  const { data: rooms } = useGetCompareRoomsQuery(roomsIds.roomId1, roomsIds.roomId2);

  //TODO:  isLoaading 떄 스켈레톤 처리
  if (!rooms) return;

  const formattedOptionDetail = () => {
    const optionsState: OptionDetail[] = OPTIONS.map(option => ({
      optionId: option.id,
      optionName: option.displayName,
      hasOption: [false, false],
    }));

    rooms.forEach((room, index) => {
      room.options.forEach(optionId => {
        const targetOption = optionsState.find(option => option.optionId === optionId)!;
        targetOption.hasOption[index] = true;
      });
    });
    return optionsState;
  };

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

  if (!rooms.length) return <div>loading</div>;

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
              <S.Title key={rooms[0].checklistId}>{rooms[0].roomName}</S.Title>
              <RoomMarker type={'A'} />
            </S.RoomTitle>
            <S.RoomTitle>
              <S.Title key={rooms[1].checklistId}>{rooms[1].roomName}</S.Title>
              <RoomMarker type={'B'} />
            </S.RoomTitle>
          </S.TitleFlex>
        </S.RoomGrid>
        <RoomCompareMap positions={positions} />
        <S.RoomGrid>
          {rooms?.map((room, index) => (
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
            optionCounts={[rooms[0].options.length, rooms[1].options.length]}
            hasOptions={formattedOptionDetail()}
            roomTitle1={rooms[0].roomName ?? ''}
            roomTitle2={rooms[1].roomName ?? ''}
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
