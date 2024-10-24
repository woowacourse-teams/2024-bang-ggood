import { useMemo } from 'react';

import ChecklistTabFallback from '@/components/_common/errorBoundary/ChecklistTabFallback';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import Tabs from '@/components/_common/Tabs/Tabs';
import useInitialChecklist from '@/hooks/useInitialChecklist';
import useTabs from '@/hooks/useTabs';
import useChecklistStore from '@/store/useChecklistStore';

const NewChecklistTab = () => {
  const { data: checklist, isFetched, isLoading } = useInitialChecklist();
  const checklistStore = useChecklistStore(state => state.checklistCategoryQnA);
  const { getTabsForChecklist } = useTabs();

  const categoryTabs = useMemo(() => {
    if (isFetched && checklist) {
      return getTabsForChecklist(checklist);
    }
    return [];
  }, [isFetched, getTabsForChecklist, checklistStore]);

  if (isLoading) return <ChecklistTabFallback />;

  return (
    <FlexBox.Vertical gap={'1rem'}>
      <Tabs tabList={categoryTabs} />
    </FlexBox.Vertical>
  );
};

export default NewChecklistTab;
