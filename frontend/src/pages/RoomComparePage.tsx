import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import RoomCompareMap from '@/components/_common/Map/RoomCompareMap';
import { default as Marker } from '@/components/_common/Marker/Marker';
import CategoryDetailModal from '@/components/RoomCompare/CategoryDetailModal';
import CompareCard from '@/components/RoomCompare/CompareCard';
import OptionDetailModal from '@/components/RoomCompare/OptionDetailModal';
import { OPTIONS } from '@/constants/options';
import { ROUTE_PATH } from '@/constants/routePath';
import useGetCompareRoomsQuery from '@/hooks/query/useGetCompareRoomsQuery';
import useModal from '@/hooks/useModal';
import { flexCenter, flexRow } from '@/styles/common';
import theme from '@/styles/theme';

export interface OptionDetail {
  optionId: number;
  optionName: string;
  hasOption: [boolean, boolean];
}

const RoomComparePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const roomId1 = Number(searchParams.get('roomId1'));
  const roomId2 = Number(searchParams.get('roomId2'));

  const { isModalOpen: isOptionModalOpen, openModal: openOptionModal, closeModal: closeOptionModal } = useModal();
  const { isModalOpen: isCategoryModalOpen, openModal: openCategoryModal, closeModal: closeCategoryModal } = useModal();

  if (!roomId1 || !roomId2) throw new Error('잘못된 비교입니다.');
  const { data: rooms } = useGetCompareRoomsQuery(roomId1, roomId2);

  const formattedOptionDetail = () => {
    const optionsState: OptionDetail[] = OPTIONS.map(option => ({
      optionId: option.id,
      optionName: option.displayName,
      hasOption: [false, false],
    }));

    rooms?.forEach((room, index) => {
      room.options.forEach(optionId => {
        const targetOption = optionsState.find(option => option.optionId === optionId)!;
        targetOption.hasOption[index] = true;
      });
    });
    return optionsState;
  };

  const handleOpenCategoryDetailModal = (roomId: number, categoryId: number) => {
    openCategoryModal();
    searchParams.append('targetRoomId', String(roomId));
    searchParams.append('categoryId', String(categoryId));
    setSearchParams(searchParams);
  };

  const handleCloseategoryDetailModal = () => {
    closeCategoryModal();
    searchParams.delete('targetRoomId');
    searchParams.delete('categoryId');
    setSearchParams(searchParams);
  };

  const handleClickBackward = () => {
    navigate(ROUTE_PATH.checklistList);
  };

  if (!rooms) return <div>loading</div>;

  const positions = rooms?.map(room => ({
    latitude: room.geolocation.latitude,
    longitude: room.geolocation.longitude,
  }));

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
              <Marker isCircle={true} size={'medium'} backgroundColor={theme.palette.yellow500} text={'A'} />
            </S.RoomTitle>
            <S.RoomTitle>
              <S.Title key={rooms[1].checklistId}>{rooms[1].roomName}</S.Title>
              <Marker isCircle={true} size={'medium'} backgroundColor={theme.palette.green500} text={'B'} />
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
    width: calc(100% - 3rem);
    padding: 0.8rem 0;

    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: 1.8rem;
    text-align: center;
    border-radius: 0.8rem;
  `,
};
