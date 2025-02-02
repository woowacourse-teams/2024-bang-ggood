import { Suspense, useMemo } from 'react';

import Tabs from '@/components/_common/Tabs/Tabs';
import useGetAllChecklistQuestionQuery from '@/hooks/query/useGetAllChecklistQuestionsQuery';
import useTabs from '@/hooks/useTabs';

export const ChecklistQuestionSelectTabs = () => {
  const { data: checklistQuestions, isSuccess } = useGetAllChecklistQuestionQuery();
  const { getTabs } = useTabs();

  const selectTabs = useMemo(() => {
    if (isSuccess && checklistQuestions) {
      return getTabs(checklistQuestions);
    }
    return [];
  }, [isSuccess]);

  return (
    <Suspense>
      <Tabs tabList={selectTabs} />
    </Suspense>
  );
};
