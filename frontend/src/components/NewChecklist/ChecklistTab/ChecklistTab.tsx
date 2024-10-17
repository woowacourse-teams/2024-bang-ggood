import Tabs from '@/components/_common/Tabs/Tabs';
import useChecklistTabs from '@/hooks/useChecklistTabs';

const ChecklistTab = () => {
  const { tabs } = useChecklistTabs();

  return <Tabs tabList={tabs} />;
};

export default ChecklistTab;
