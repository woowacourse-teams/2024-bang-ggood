import Tabs from '@/components/_common/Tabs/Tabs';
import { findCategoryClassNameByName } from '@/constants/category';
import useChecklistQuestionSelectStore from '@/store/useChecklistQuestionSelectStore';

export const ChecklistQuestionSelectTabs = () => {
  const { validCategory: validCategoryEditMode } = useChecklistQuestionSelectStore();

  const checklistQuestionSelectTabs = validCategoryEditMode.map(category => ({
    id: category.categoryId,
    name: category.categoryName as string,
    className: findCategoryClassNameByName(category.categoryName),
  }));

  return <Tabs tabList={checklistQuestionSelectTabs} />;
};
