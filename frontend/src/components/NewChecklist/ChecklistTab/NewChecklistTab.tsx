import { useMemo } from 'react';

import ChecklistTabSuspense from '@/components/_common/errorBoundary/ChecklistTabSuspense';
import Tabs from '@/components/_common/Tabs/Tabs';
import useInitialChecklist from '@/hooks/useInitialChecklist';
import useTabs from '@/hooks/useTabs';
import useChecklistStore from '@/store/useChecklistStore';
import isSameCategory from '@/utils/isSameCategory';

const NewChecklistTab = () => {
  const { data: checklist, isSuccess, isLoading } = useInitialChecklist();
  const checklistStore = useChecklistStore(state => state.checklistCategoryQnA);
  const { getTabsForChecklist } = useTabs();

  const categoryTabs = useMemo(() => {
    if (isSuccess && isSameCategory(checklist, checklistStore)) {
      return getTabsForChecklist(checklist);
    }
    return [];
  }, [isSuccess, checklistStore]);

  if (isLoading) return <ChecklistTabSuspense />;

  return <Tabs tabList={categoryTabs} />;
};

export default NewChecklistTab;
