import { useMemo } from 'react';

import ChecklistTabFallback from '@/components/_common/errorBoundary/ChecklistTabFallback';
import Tabs from '@/components/_common/Tabs/Tabs';
import useGetChecklistDetailQuery from '@/hooks/query/useGetChecklistDetailQuery';
import useTabs from '@/hooks/useTabs';
import useChecklistStore from '@/store/useChecklistStore';

interface Props {
  checklistId: string;
}

const EditChecklistTab = ({ checklistId }: Props) => {
  const { data: checklist, isFetched, isLoading } = useGetChecklistDetailQuery(checklistId);
  const checklistStore = useChecklistStore(state => state.checklistCategoryQnA);
  const { getTabsForChecklist } = useTabs();

  const categoryTabs = useMemo(() => {
    if (isFetched && checklist && checklistStore.length) {
      return getTabsForChecklist(checklist.categories);
    }
    return [];
  }, [isFetched, getTabsForChecklist, checklistStore]);

  if (isLoading) return <ChecklistTabFallback />;

  return <Tabs tabList={categoryTabs} />;
};

export default EditChecklistTab;
