import { useMemo } from 'react';

import ChecklistTabFallback from '@/components/_common/errorBoundary/ChecklistTabFallback';
import Tabs from '@/components/_common/Tabs/Tabs';
import useInitialChecklist from '@/hooks/useInitialChecklist';
import useTabs from '@/hooks/useTabs';
import useChecklistStore from '@/store/useChecklistStore';

const NewChecklistTab = () => {
  const { data: checklist, isFetched, isLoading } = useInitialChecklist();
  const checklistStore = useChecklistStore(state => state.checklistCategoryQnA);
  const { getTabsForChecklist } = useTabs();

  const categoryTabs = useMemo(() => {
    if (isFetched && checklist && checklistStore.length) {
      return getTabsForChecklist(checklist);
    }
    return [];
  }, [isFetched, getTabsForChecklist, checklistStore]);

  if (isLoading) return <ChecklistTabFallback />;

  return <Tabs tabList={categoryTabs} />;
};

export default NewChecklistTab;
