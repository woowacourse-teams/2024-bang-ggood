import { useMemo } from 'react';

import ChecklistTabSuspense from '@/components/_common/errorBoundary/ChecklistTabSuspense';
import Tabs from '@/components/_common/Tabs/Tabs';
import useGetChecklistDetailQuery from '@/hooks/query/useGetChecklistDetailQuery';
import useTabs from '@/hooks/useTabs';
import useChecklistStore from '@/store/useChecklistStore';
import isSameCategory from '@/utils/isSameCategory';

interface Props {
  checklistId: string;
}

const EditChecklistTab = ({ checklistId }: Props) => {
  const { data: checklist, isSuccess, isLoading } = useGetChecklistDetailQuery(checklistId);
  const checklistStore = useChecklistStore(state => state.checklistCategoryQnA);
  const { getTabsForChecklist } = useTabs();

  const categoryTabs = useMemo(() => {
    if (isSuccess && isSameCategory(checklist.categories, checklistStore)) {
      return getTabsForChecklist(checklist.categories);
    }
    return [];
  }, [isSuccess, checklistStore]);

  if (isLoading) return <ChecklistTabSuspense />;

  return <Tabs tabList={categoryTabs} />;
};

export default EditChecklistTab;
