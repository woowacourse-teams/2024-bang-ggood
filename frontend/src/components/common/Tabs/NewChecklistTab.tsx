import Tabs from '@/components/common/Tabs/Tabs';
import useChecklistStore from '@/store/useChecklistStore';

type MODE = 'edit' | 'write';

const ChecklistTabs = ({ mode }: { mode: MODE }) => {
  const { validCategory, isCategoryQuestionAllCompleted } = useChecklistStore();

  const newChecklistTabsWithCompletion = validCategory.map(category => ({
    id: category.categoryId,
    name: category.categoryName as string,
    isCompleted: isCategoryQuestionAllCompleted(category.categoryId),
  }));

  if (mode === 'write') {
    newChecklistTabsWithCompletion.unshift({ id: 0, name: '방 기본정보', isCompleted: false });
  }

  return (
    <>
      <Tabs tabList={newChecklistTabsWithCompletion} />
    </>
  );
};

export default ChecklistTabs;
