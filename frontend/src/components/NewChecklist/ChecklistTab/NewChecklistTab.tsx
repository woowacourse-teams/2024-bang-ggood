import { useMemo } from 'react';

import ChecklistTabSuspense from '@/components/_common/errorBoundary/ChecklistTabSuspense';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import Tabs from '@/components/_common/Tabs/Tabs';
import { DefaultChecklistTabsNames } from '@/constants/tabs';
import useInitialChecklist from '@/hooks/useInitialChecklist';
import useMouseDrag from '@/hooks/useMouseDrag';
import useTabs from '@/hooks/useTabs';
import useChecklistStore from '@/store/useChecklistStore';
import isSameCategory from '@/utils/isSameCategory';

const NewChecklistTab = () => {
  const { data: checklist, isSuccess, isLoading } = useInitialChecklist();
  const checklistStore = useChecklistStore(state => state.checklistCategoryQnA);
  const { getTabsForChecklist } = useTabs();
  const { setCurrentTabId } = useTabContext();

  useMouseDrag((S, E) => {
    const DRAG_THRESHOLD = 100;
    const TAB_COUNT = DefaultChecklistTabsNames.length;
    const remainOp = (a: number, b: number) => (((a % b) + b + 1) % b) - 1; // 나머지연산자. -1부터 시작하므로 +1 -1
    setCurrentTabId(tabId => {
      const isLeftDrag = E.x - S.x > DRAG_THRESHOLD;
      const isRightDrag = S.x - E.x > DRAG_THRESHOLD;
      if (isLeftDrag) return remainOp(tabId - 1, TAB_COUNT);
      if (isRightDrag) return remainOp(tabId + 1, TAB_COUNT);
      return tabId;
    });
  });

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
