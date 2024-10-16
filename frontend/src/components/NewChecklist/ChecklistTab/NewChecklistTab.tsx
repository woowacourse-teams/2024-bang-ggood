import { useMemo } from 'react';

import ChecklistTabFallback from '@/components/_common/errorBoundary/ChecklistTabFallback';
import Tabs from '@/components/_common/Tabs/Tabs';
import useGetChecklistQuestionQuery from '@/hooks/query/useGetChecklistQuestionQuery';
import useTabs from '@/hooks/useTabs';

const NewChecklistTab = () => {
  const { data: checklist, isFetched, isLoading } = useGetChecklistQuestionQuery();
  const { getTabsForChecklist } = useTabs();

  const categoryTabs = useMemo(() => {
    if (isFetched && checklist) {
      return getTabsForChecklist(checklist);
    }
    return [];
  }, [isFetched, getTabsForChecklist]);

  if (isLoading) return <ChecklistTabFallback />;

  return <Tabs tabList={categoryTabs} />;
};

export default NewChecklistTab;
