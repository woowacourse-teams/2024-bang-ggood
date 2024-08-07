import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getChecklists } from '@/apis/checklist';
import Button from '@/components/_common/Button/Button';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import CompareSelectCard from '@/components/RoomCompare/CompareSelectCard';
import { ROUTE_PATH } from '@/constants/routePath';
import useRoomCompareStore from '@/store/useRoomCompareStore';
import { flexRow } from '@/styles/common';
import theme from '@/styles/theme';
import { ChecklistPreview } from '@/types/checklist';

const RoomCompareSelectPage = () => {
  const { rooms, toggleRoom, hasRoom } = useRoomCompareStore();

  const [checklistList, setChecklistList] = useState<ChecklistPreview[]>([]);
  useEffect(() => {
    const fetchChecklist = async () => {
      const checklistList = await getChecklists();
      setChecklistList(checklistList);
    };

    fetchChecklist();
  }, []);

  const navigate = useNavigate();
  const handleSubmit = () => {
    const roomList = Array.from(rooms);
    navigate(ROUTE_PATH.roomCompare, { state: { id1: roomList[0], id2: roomList[1], id3: roomList[2] } });
  };

  return (
    <>
      <Header
        left={<Header.Backward />}
        center={<Header.Text>방 비교하기</Header.Text>}
        right={<Button label="비교" color="dark" size="small" onClick={handleSubmit} />}
      />
      <Layout bgColor={theme.palette.background}>
        <S.Wrapper bgColor={theme.palette.background}>
          {checklistList.map(roomPreview => (
            <>
              <CompareSelectCard
                key={roomPreview.checklistId + Array.from(rooms)[0]}
                isSelected={hasRoom(roomPreview.checklistId)}
                onClick={() => {
                  toggleRoom(roomPreview.checklistId);
                }}
                room={roomPreview}
              />
            </>
          ))}
        </S.Wrapper>
      </Layout>
    </>
  );
};

export default RoomCompareSelectPage;

const S = {
  RoomGrid: styled.div`
    ${flexRow}
  `,
  Wrapper: styled.div<{ bgColor: string }>`
    display: flex;

    background-color: ${({ bgColor }) => bgColor};
    overflow-y: scroll;
    flex-direction: column;
    row-gap: 10px;
  `,
};
