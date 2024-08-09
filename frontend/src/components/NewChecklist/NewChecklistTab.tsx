import Tabs from '@/components/_common/Tabs/Tabs';
import useChecklistStore from '@/store/useChecklistStore';

const NewChecklistTab = () => {
  const { validCategory, isCategoryQuestionAllCompleted } = useChecklistStore();

  const newChecklistTabsWithCompletion = validCategory.map(category => ({
    id: category.categoryId,
    name: category.categoryName,
    isCompleted: isCategoryQuestionAllCompleted(category.categoryId),
  }));

  const tabsWithBasicInfoAndOptions = [
    { id: -1, name: '방 기본정보', isCompleted: false },
    { id: 0, name: '옵션', isCompleted: false },
    ...newChecklistTabsWithCompletion,
  ];

  return (
    <>
      <Tabs tabList={tabsWithBasicInfoAndOptions} />
    </>
  );
};

export default NewChecklistTab;
