import styled from '@emotion/styled';

import ChecklistPreviewCard from '@/components/Main/ChecklistPreviewCard';
import SkChecklistSection from '@/components/skeleton/Main/SkChecklistSection';
import { MAX_CHECKLISTS_DISPLAY_COUNT } from '@/constants/system';
import useGetChecklistListQuery from '@/hooks/query/useGetChecklistListQuery';
import { flexColumn } from '@/styles/common';
import { ChecklistPreview } from '@/types/checklist';

const ChecklistCardContainer = () => {
  const { data: checklistList, isLoading } = useGetChecklistListQuery();

  if (isLoading) return <SkChecklistSection />;

  return (
    <S.Container>
      {checklistList
        ?.slice(0, MAX_CHECKLISTS_DISPLAY_COUNT)
        .map((checklist: ChecklistPreview, index: number) => (
          <ChecklistPreviewCard key={checklist.checklistId} index={index} checklist={checklist} />
        ))}
    </S.Container>
  );
};

export default ChecklistCardContainer;

const S = {
  Container: styled.div`
    ${flexColumn};
    gap: 0.8rem;
  `,
};
