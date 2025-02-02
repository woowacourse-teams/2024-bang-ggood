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

  const getNextTab = ({ currentTabId, categories }: { currentTabId: number; categories: Category[] }) => {
    const currentTabs = [-1, 0, ...categories.map(category => category.categoryId)];
    const currentTabIndex = currentTabs.findIndex(tab => tab === currentTabId);
    const nextTabIndex = currentTabIndex === currentTabs.length - 1 ? 0 : currentTabIndex + 1;
    return currentTabs[nextTabIndex];
  };

  const getPrevTab = ({ currentTabId, categories }: { currentTabId: number; categories: Category[] }) => {
    const currentTabs = [-1, 0, ...categories.map(category => category.categoryId)];
    const currentTabIndex = currentTabs.findIndex(tab => tab === currentTabId);
    const prevTabIndex = currentTabIndex === 0 ? currentTabs.length - 1 : currentTabIndex - 1;
    return currentTabs[prevTabIndex];
  };

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
    getNextTab,
    getPrevTab,
  };
};

export default useTabs;
