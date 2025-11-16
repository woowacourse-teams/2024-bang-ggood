import { Suspense, useMemo } from 'react';

import Tabs from '@/components/_common/Tabs/Tabs';
import useGetAllChecklistQuestionQuery from '@/hooks/query/useGetAllChecklistQuestionsQuery';
import useTabs from '@/hooks/useTabs';

export const ChecklistQuestionSelectTabs = () => {
  const { data, isSuccess } = useGetAllChecklistQuestionQuery();
  const defaultCategories = data?.defaultCategories;
  const { getTabs } = useTabs();

  const selectTabs = useMemo(() => {
    if (isSuccess && defaultCategories) {
      return getTabs(defaultCategories);
    }
    return [];
  }, [isSuccess, defaultCategories, getTabs]);

  return (
    <Suspense>
      <Tabs tabList={selectTabs} />
    </Suspense>
  );
};
