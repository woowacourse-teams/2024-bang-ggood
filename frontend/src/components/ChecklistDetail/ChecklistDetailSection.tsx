import { useParams } from 'react-router-dom';

import ChecklistAnswerSection from '@/components/ChecklistDetail/ChecklistAnswerSection';
import MemoSection from '@/components/ChecklistDetail/MemoSection';
import RoomInfoSection from '@/components/ChecklistDetail/RoomInfoSection';
import SkChecklistDetail from '@/components/skeleton/ChecklistDetail/SkChecklistDetail';
import useGetChecklistDetailQuery from '@/hooks/query/useGetChecklistDetailQuery';

type RouteParams = {
  checklistId: string;
};

const ChecklistDetailSection = () => {
  const { checklistId } = useParams() as RouteParams;
  const { data: checklist, isLoading } = useGetChecklistDetailQuery(checklistId);

  if (isLoading) return <SkChecklistDetail />;
  if (!checklist) return;

  return (
    <>
      <RoomInfoSection
        room={checklist?.room}
        options={checklist?.options}
        isLiked={checklist?.isLiked}
        checklistId={Number(checklistId)}
        nearSubways={checklist?.room.address === '' ? [] : checklist?.stations}
      />
      <ChecklistAnswerSection categories={checklist?.categories} />
      <MemoSection memo={checklist?.room?.memo} />
    </>
  );
};

export default ChecklistDetailSection;
