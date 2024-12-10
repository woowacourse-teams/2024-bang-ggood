import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';

import RoomCompareMap from '@/components/_common/Map/RoomCompareMap';
import Marker from '@/components/_common/Marker/Marker';
import CategoryDetailModal from '@/components/RoomCompare/CategoryDetailModal';
import CompareCard from '@/components/RoomCompare/CompareCard';
import OptionDetailModal from '@/components/RoomCompare/OptionDetailModal';
import SkRoomCompare from '@/components/skeleton/RoomCompare/SkRoomCompare';
import { OPTIONS } from '@/constants/options';
import useGetCompareRoomsQuery from '@/hooks/query/useGetCompareRoomsQuery';
import useModal from '@/hooks/useModal';
import { OptionDetail } from '@/pages/RoomComparePage';
import { flexCenter, flexRow } from '@/styles/common';
import theme from '@/styles/theme';

const RoomCompareContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isModalOpen: isOptionModalOpen, openModal: openOptionModal, closeModal: closeOptionModal } = useModal();
  const { isModalOpen: isCategoryModalOpen, openModal: openCategoryModal, closeModal: closeCategoryModal } = useModal();

  const roomId1 = Number(searchParams.get('roomId1'));
  const roomId2 = Number(searchParams.get('roomId2'));

  const { data: rooms, isLoading } = useGetCompareRoomsQuery(roomId1, roomId2);

  if (isLoading) return <SkRoomCompare />;

  if (!rooms) throw new Error('데이터를 불러오는데 실패했습니다.');

  const positions = rooms?.map(room => ({
    latitude: room?.latitude ?? null,
    longitude: room?.longitude ?? null,
  }));

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

  return (
    <>
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
      {positions && <RoomCompareMap positions={positions} />}
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
    </>
  );
};

export default RoomCompareContent;

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
