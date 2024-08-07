import Tabs from '@/components/_common/Tabs/Tabs';
import useChecklistStore from '@/store/useChecklistStore';

const NewChecklistTab = () => {
  const { validCategory, isCategoryQuestionAllCompleted } = useChecklistStore();

  const newChecklistTabsWithCompletion = validCategory.map(category => ({
    id: category.categoryId,
    name: category.categoryName,
    isCompleted: isCategoryQuestionAllCompleted(category.categoryId),
  }));

  const tabsWithBasicInfo = [{ id: 0, name: '방 기본정보', isCompleted: false }, ...newChecklistTabsWithCompletion];

  return (
    <>
      <Tabs tabList={tabsWithBasicInfo} />
    </>
  );
};

export default NewChecklistTab;
