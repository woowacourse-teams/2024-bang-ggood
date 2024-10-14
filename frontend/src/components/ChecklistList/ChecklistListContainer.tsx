import styled from '@emotion/styled';

import ChecklistCard from '@/components/ChecklistList/ChecklistCard';
import NoChecklistTemplate from '@/components/ChecklistList/NoChecklistTemplate';
import SkChecklistList from '@/components/skeleton/ChecklistList/SkChecklistLst';
import useGetChecklistListQuery from '@/hooks/query/useGetChecklistListQuery';
import { flexColumn } from '@/styles/common';
import { ChecklistPreview } from '@/types/checklist';

const ChecklistListContainer = () => {
  const { data: checklistList, isLoading } = useGetChecklistListQuery();

  if (isLoading) return <SkChecklistList />;

  return (
    <S.ListBox>
      {checklistList?.length ? (
        <>
          {checklistList?.map((checklist: ChecklistPreview) => (
            <ChecklistCard key={checklist.checklistId} checklist={checklist} />
          ))}
        </>
      ) : (
        <NoChecklistTemplate />
      )}
    </S.ListBox>
  );
};

export default ChecklistListContainer;

const S = {
  ListBox: styled.section`
    ${flexColumn}
    gap: 1.2rem;
    overflow-y: scroll;
    margin-bottom: 8rem;
  `,
};
