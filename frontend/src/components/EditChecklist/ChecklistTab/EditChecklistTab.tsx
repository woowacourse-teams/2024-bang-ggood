import { useMemo } from 'react';

import ChecklistTabFallback from '@/components/_common/errorBoundary/ChecklistTabFallback';
import Tabs from '@/components/_common/Tabs/Tabs';
import useGetChecklistDetailQuery from '@/hooks/query/useGetChecklistDetailQuery';
import useTabs from '@/hooks/useTabs';

interface Props {
  checklistId: string;
}

const EditChecklistTab = ({ checklistId }: Props) => {
  const { data: checklist, isFetched, isLoading } = useGetChecklistDetailQuery(checklistId);
  const { getTabsForChecklist } = useTabs();

  const categoryTabs = useMemo(() => {
    if (isFetched && checklist) {
      return getTabsForChecklist(checklist.categories);
    }
    return [];
  }, [isFetched, getTabsForChecklist]);

  if (isLoading) return <ChecklistTabFallback />;

  return <Tabs tabList={categoryTabs} />;
};

export default EditChecklistTab;
