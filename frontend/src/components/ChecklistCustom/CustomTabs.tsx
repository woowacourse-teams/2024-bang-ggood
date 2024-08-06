import Tabs from '@/components/_common/Tabs/Tabs';
import useChecklistCustomStore from '@/store/useChecklistCustomStore';

export const ChecklistCustomTabs = () => {
  const { validCategory: validCategoryEditMode } = useChecklistCustomStore();

  const checklistCustomTabs = validCategoryEditMode.map(category => ({
    id: category.categoryId,
    name: category.categoryName as string,
  }));
  return (
    <>
      <Tabs tabList={checklistCustomTabs} />
    </>
  );
};
