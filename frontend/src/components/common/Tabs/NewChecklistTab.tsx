import Tabs from '@/components/common/Tabs/Tabs';
import useChecklistCustomStore from '@/store/useChecklistCustomStore';
import useChecklistStore from '@/store/useChecklistStore';

type MODE = 'edit' | 'write';

const ChecklistTabs = ({ mode }: { mode: MODE }) => {
  const { validCategory: validCategoryWriteMode, isCategoryQuestionAllCompleted } = useChecklistStore();
  const { validCategory: validCategoryEditMode } = useChecklistCustomStore();

  const newChecklistTabsWithCompletion = validCategoryWriteMode.map(category => ({
    id: category.categoryId,
    name: category.categoryName as string,
    isCompleted: isCategoryQuestionAllCompleted(category.categoryId),
  }));

  if (mode === 'write') {
    newChecklistTabsWithCompletion.unshift({ id: 0, name: '방 기본정보', isCompleted: false });
    return <Tabs tabList={newChecklistTabsWithCompletion} />;
  }

  const checklistCustomTabs = validCategoryEditMode.map(category => ({
    id: category.categoryId,
    name: category.categoryName as string,
    isCompleted: isCategoryQuestionAllCompleted(category.categoryId),
  }));

  return (
    <>
      <Tabs tabList={checklistCustomTabs} />
    </>
  );
};

export default ChecklistTabs;
