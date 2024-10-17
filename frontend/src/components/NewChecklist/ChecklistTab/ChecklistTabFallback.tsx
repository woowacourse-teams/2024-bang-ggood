import Tabs from '@/components/_common/Tabs/Tabs';

const ChecklistTabFallback = () => {
  const tabsWithFailed = [
    { id: -1, name: '기본정보', hasIndicator: false },
    { id: 0, name: '옵션', hasIndicator: false },
    { id: 1, name: '질문', hasIndicator: false },
  ];

  return <Tabs tabList={tabsWithFailed} />;
};

export default ChecklistTabFallback;
