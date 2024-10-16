import { useMemo } from 'react';

import Tabs from '@/components/_common/Tabs/Tabs';
import useGetChecklistQuestionQuery from '@/hooks/query/useGetChecklistQuestionQuery';
import useTabs from '@/hooks/useTabs';

const ChecklistTab = () => {
  const { data: checklist, isFetched } = useGetChecklistQuestionQuery();
  const { getTabsForChecklist } = useTabs();

  const categoryTabs = useMemo(() => {
    if (isFetched && checklist) {
      return getTabsForChecklist(checklist);
    }
    return [];
  }, [isFetched, getTabsForChecklist]);

  return <Tabs tabList={categoryTabs} />;
};

export default ChecklistTab;
