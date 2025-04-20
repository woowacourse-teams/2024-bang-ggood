import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/_common/Button/Button';
import ChecklistPreviewCard from '@/components/Main/ChecklistPreviewCard';
import SkChecklistSection from '@/components/skeleton/Main/SkChecklistSection';
import { ROUTE_PATH } from '@/constants/routePath';
import { MAX_CHECKLISTS_DISPLAY_COUNT } from '@/constants/system';
import useGetChecklistListQuery from '@/hooks/query/useGetChecklistListQuery';
import { ChecklistPreview } from '@/types/checklist';

const ChecklistCardContainer = () => {
  const navigate = useNavigate();
  const { data: checklistList, isLoading } = useGetChecklistListQuery();

  const handleNewChecklist = () => {
    navigate(ROUTE_PATH.checklistNew);
  };

  if (isLoading) return <SkChecklistSection />;

  return (
    <>
      {checklistList
        ?.slice(0, MAX_CHECKLISTS_DISPLAY_COUNT)
        .map((checklist: ChecklistPreview, index: number) => (
          <ChecklistPreviewCard key={checklist.checklistId} index={index} checklist={checklist} />
        ))}
  );
};

export default ChecklistCardContainer;

const S = {
  `,
};
