import Tabs from '@/components/_common/Tabs/Tabs';
import { TabWithCompletion } from '@/types/tab';

const ChecklistTabSuspense = () => {
  const tabsWithFailed: TabWithCompletion[] = [
    { id: -1, name: '기본정보', isCompleted: true },
    { id: 0, name: '옵션', isCompleted: true },
  ];

  return <Tabs tabList={tabsWithFailed} />;
};

export default ChecklistTabSuspense;
