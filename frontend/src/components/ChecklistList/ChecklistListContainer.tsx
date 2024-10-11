import styled from '@emotion/styled';
import { useEffect } from 'react';

import ChecklistCard from '@/components/ChecklistList/ChecklistCard';
import NoChecklistTemplate from '@/components/ChecklistList/NoChecklistTemplate';
import SkChecklistList from '@/components/skeleton/ChecklistList/SkChecklistLst';
import useGetChecklistListQuery from '@/hooks/query/useGetChecklistListQuery';
import { flexColumn } from '@/styles/common';
import { ChecklistPreview } from '@/types/checklist';

interface Props {
  setChecklistSize: (size: number) => void;
}

const ChecklistListContainer = ({ setChecklistSize }: Props) => {
  const { data: checklistList, isLoading } = useGetChecklistListQuery();

  useEffect(() => {
    if (checklistList) {
      setChecklistSize(checklistList.length);
    }
  }, [checklistList, setChecklistSize]);

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
