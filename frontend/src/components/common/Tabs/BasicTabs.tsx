import Tabs from '@/components/common/Tabs/Tabs';

const BasicTabs = () => {
  const menuList = [
    {
      name: '기본 정보',
      path: 'basic-info',
    },
    {
      name: '체크리스트',
      path: 'checklist',
    },
    {
      name: '메모 및 사진',
      path: 'extra-info',
    },
  ];

  return <Tabs menuList={menuList} />;
};

export default BasicTabs;
