import { useCallback } from 'react';

import { findCategoryClassNameByName } from '@/constants/category';
import useChecklistStore from '@/store/useChecklistStore';
import { Category } from '@/types/category';
import { Tab, TabWithCompletion } from '@/types/tab';

const useTabs = () => {
  const getTabs = (categories: Category[]) => {
    return categories.map(category => ({
      id: category.categoryId,
      name: category.categoryName,
      className: findCategoryClassNameByName(category.categoryName),
    })) as Tab[];
  };

  const actions = useChecklistStore(state => state.actions);
  const isCategoryQuestionAllCompleted = useCallback(
    (targetId: number) => {
      const targetCategory = actions.getCategory(targetId);
      return targetCategory?.questions.every(question => question.answer !== 'NONE');
    },
    [actions],
  );

  const getTabsWithIsCompleted = (categories: Category[]) => {
    return categories.map(category => ({
      id: category.categoryId,
      name: category.categoryName as string,
      className: findCategoryClassNameByName(category.categoryName),
      isCompleted: isCategoryQuestionAllCompleted(category.categoryId),
    })) as TabWithCompletion[];
  };

  const getTabsForChecklist = (categories: Category[]) => {
    const category = getTabsWithIsCompleted(categories);
    const tabsWithBasicInfoAndOptions = [
      { id: -1, name: '기본정보', isCompleted: true },
      { id: 0, name: '옵션', isCompleted: true },
      ...category,
    ];

    return tabsWithBasicInfoAndOptions;
  };

  return {
    getTabs,
    getTabsForChecklist,
  };
};

export default useTabs;
