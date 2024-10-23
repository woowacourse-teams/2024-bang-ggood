import { Suspense, useMemo } from 'react';

import Tabs from '@/components/_common/Tabs/Tabs';
import useGetAllChecklistQuestionQuery from '@/hooks/query/useGetAllChecklistQuestionsQuery';
import useTabs from '@/hooks/useTabs';

export const ChecklistQuestionSelectTabs = () => {
  const { data: checklistQuestions, isFetched } = useGetAllChecklistQuestionQuery();
  const { getTabs } = useTabs();

  const selectTabs = useMemo(() => {
    if (isFetched && checklistQuestions) {
      return getTabs(checklistQuestions);
    }
    return [];
  }, [isFetched, getTabs]);

  return (
    <Suspense>
      <Tabs tabList={selectTabs} />
    </Suspense>
  );
};
