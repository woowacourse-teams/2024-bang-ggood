import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import ChecklistTabFallback from '@/components/_common/errorBoundary/ChecklistTabFallback';
import Tabs from '@/components/_common/Tabs/Tabs';
import useGetChecklistDetailQuery from '@/hooks/query/useGetChecklistDetailQuery';
import useTabs from '@/hooks/useTabs';
import useChecklistStore from '@/store/useChecklistStore';

const EditChecklistTab = () => {
  const { checklistId } = useParams();
  if (!checklistId) throw new Error('잘못된 체크리스트 입니다.');
  const { data: checklist, isFetched, isLoading } = useGetChecklistDetailQuery(checklistId);
  const checklistStore = useChecklistStore(state => state.checklistCategoryQnA);
  const { getTabsForChecklist } = useTabs();

  const categoryTabs = useMemo(() => {
    if (isFetched && checklist) {
      return getTabsForChecklist(checklist.categories);
    }
    return [];
  }, [isFetched, getTabsForChecklist, checklistStore, checklistId]);

  if (isLoading) return <ChecklistTabFallback />;

  return <Tabs tabList={categoryTabs} />;
};

export default EditChecklistTab;
