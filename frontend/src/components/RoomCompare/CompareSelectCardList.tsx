import styled from '@emotion/styled';

import CompareSelectCard from '@/components/RoomCompare/CompareSelectCard';
import SkChecklistList from '@/components/skeleton/ChecklistList/SkChecklistLst';
import { flexColumn } from '@/styles/common';
import { ChecklistPreview } from '@/types/checklist';

interface Props {
  userChecklists: ChecklistPreview[];
  selectedRoomIds: Set<number>;
  toggleSelectChecklist: (roomId: number) => void;
  isLoading: boolean;
}

const CompareSelectCardList = ({ isLoading, userChecklists, selectedRoomIds, toggleSelectChecklist }: Props) => {
  if (isLoading) {
    return (
      <S.CardContainer>
        <SkChecklistList />
      </S.CardContainer>
    );
  }

  const isSelectedRoom = (roomId: number) => !!selectedRoomIds.has(roomId);

  return (
    <S.CardContainer>
      {userChecklists?.map(checklist => (
        <CompareSelectCard
          key={checklist.checklistId}
          isSelected={isSelectedRoom(checklist.checklistId)}
          room={checklist}
          toggleSelectChecklist={toggleSelectChecklist}
        />
      ))}
    </S.CardContainer>
  );
};

export default CompareSelectCardList;

const S = {
  CardContainer: styled.div`
    ${flexColumn}
    gap: 1rem;
  `,
};
