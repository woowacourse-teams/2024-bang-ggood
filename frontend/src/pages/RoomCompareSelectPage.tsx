import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/_common/Button/Button';
import CounterBox from '@/components/_common/CounterBox/CounterBox';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import Text from '@/components/_common/Text/Text';
import CompareSelectCardList from '@/components/RoomCompare/CompareSelectCardList';
import { ROUTE_PATH } from '@/constants/routePath';
import useGetChecklistList from '@/hooks/useGetChecklistList';
import useToast from '@/hooks/useToast';
import theme from '@/styles/theme';

const MIN_ROOM_COMPARE_COUNT = 2;

const RoomCompareSelectPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [selectedRoomIds, setSelectedRoomIds] = useState<Set<number>>(new Set());
  const { data: checklistList, isLoading } = useGetChecklistList();

  const userChecklists = checklistList?.filter(checklist => checklist.checklistId !== 1) || [];

  useEffect(() => {
    if (userChecklists.length < MIN_ROOM_COMPARE_COUNT) {
      showToast({ message: '비교 기능은 작성한 체크리스트가 2개 이상일 때만 가능합니다.', type: 'info' });
      navigate(ROUTE_PATH.checklistList);
    }
  }, [userChecklists.length, navigate, showToast]);

  const handleToggleSelectChecklist = (roomId: number) => {
    setSelectedRoomIds(prev => {
      const updatedSet = new Set(prev);

      if (prev.has(roomId)) {
        updatedSet.delete(roomId);
        return updatedSet;
      }

      if (prev.size >= 2) {
        showToast({ message: '방은 2개까지만 선택할 수 있습니다.', type: 'info' });
        return prev;
      }

      updatedSet.add(roomId);
      return updatedSet;
    });
  };

  const handleNavigateToCompare = () => {
    if (selectedRoomIds.size !== 2) {
      showToast({ message: '비교할 2개의 방을 선택해주세요.', type: 'info' });
      return;
    }

    const [roomId1, roomId2] = [...selectedRoomIds];
    const searchParams = new URLSearchParams({
      roomId1: String(roomId1),
      roomId2: String(roomId2),
    });

    navigate(`${ROUTE_PATH.roomCompare}?${searchParams}`);
  };

  return (
    <>
      <Header
        left={<Header.Backward onClick={() => navigate(ROUTE_PATH.checklistList)} />}
        center={<Header.Text>비교할 방 선택하기</Header.Text>}
      />
      {/* 플로팅버튼 position:fixed 의 width를 상속받게하기위해 transform을 주는 트릭 사용하였음. */}
      <Layout bgColor={theme.palette.background} withHeader style={{ transform: 'translateZ(0)' }}>
        <S.CounterContainer>
          <CounterBox currentCount={selectedRoomIds.size} totalCount={2} />
        </S.CounterContainer>
        <CompareSelectCardList
          userChecklists={userChecklists}
          selectedRoomIds={selectedRoomIds}
          toggleSelectChecklist={handleToggleSelectChecklist}
          isLoading={isLoading}
        />
        <S.FloatingButton
          label={<Text typography={font => font.body[1].B}>선택하기</Text>}
          onClick={handleNavigateToCompare}
          id="checklistEditButton"
        />
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
  FloatingButton: styled(Button)`
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    width: inherit;
    margin: 0 1.6rem 1.6rem;

    background-color: ${({ theme }) => theme.color.primary[500]};
  `,
};

export default RoomCompareSelectPage;
