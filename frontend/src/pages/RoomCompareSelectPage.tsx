import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/_common/Button/Button';
import CounterBox from '@/components/_common/CounterBox/CounterBox';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import CompareSelectCard from '@/components/RoomCompare/CompareSelectCard';
import { ROUTE_PATH } from '@/constants/routePath';
import useGetChecklistList from '@/hooks/useGetChecklistList';
import useToast from '@/hooks/useToast';
import { flexColumn } from '@/styles/common';
import theme from '@/styles/theme';

const RoomCompareSelectPage = () => {
  const navigate = useNavigate();
  const [selectedRoomIds, setSelectedRoomIds] = useState<Set<number>>(new Set());
  const { data: checklistList } = useGetChecklistList();
  const { showToast } = useToast();

  const isSelectedRoom = (roomId: number) => !!selectedRoomIds.has(roomId);

  const toggleSelectChecklist = (roomId: number) => {
    setSelectedRoomIds(prev => {
      const updatedSet = new Set(prev);
      if (prev.has(roomId)) {
        updatedSet.delete(roomId);
      } else if (prev.size < 2) {
        updatedSet.add(roomId);
      } else {
        showToast({ message: '방은 2개까지만 선택할 수 있습니다.', type: 'info' });
      }
      return updatedSet;
    });
  };

  const handleClickBackward = () => navigate(ROUTE_PATH.checklistList);

  const handleSelectRooms = () => {
    if (selectedRoomIds.size !== 2) {
      return showToast({ message: '비교할 2개의 방을 선택해주세요.', type: 'info' });
    }
    const rooms = [...selectedRoomIds];

    navigate(ROUTE_PATH.roomCompare, {
      state: {
        roomId1: rooms[0],
        roomId2: rooms[1],
      },
    });
  };

  return (
    <>
      <Header
        left={<Header.Backward onClick={handleClickBackward} />}
        center={<Header.Text>비교할 방 선택하기</Header.Text>}
        right={
          <Button
            color={'primary'}
            label={'선택'}
            isSquare={true}
            onClick={handleSelectRooms}
            id="checklistEditButton"
          />
        }
      />
      <Layout bgColor={theme.palette.background} withHeader>
        <S.CounterContainer>
          <CounterBox currentCount={selectedRoomIds.size} totalCount={2} />
        </S.CounterContainer>
        <S.CardContainer>
          {checklistList?.map(checklist => (
            <CompareSelectCard
              key={checklist.checklistId}
              isSelected={isSelectedRoom(checklist.checklistId)}
              room={checklist}
              toggleSelectChecklist={toggleSelectChecklist}
            />
          ))}
        </S.CardContainer>
      </Layout>
    </>
  );
};

const S = {
  CounterContainer: styled.div`
    display: flex;
    width: 100%;
    height: 3rem;
    margin-top: 1rem;
    justify-content: flex-end;
  `,
  CardContainer: styled.div`
    ${flexColumn}
    gap: 1rem;
  `,
};

export default RoomCompareSelectPage;
