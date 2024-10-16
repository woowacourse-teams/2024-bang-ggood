import { findCategoryClassNameByName } from '@/constants/category';
import { Category } from '@/types/category';
import { TabWithCompletion } from '@/types/tab';

const useTabs = () => {
  const getTabs = (categories: Category[]) => {
    return categories.map(category => ({
      id: category.categoryId,
      name: category.categoryName as string,
      className: findCategoryClassNameByName(category.categoryName),
    })) as TabWithCompletion[];
  };

  const getTabsForChecklist = (categories: Category[]) => {
    const category = getTabs(categories);
    const tabsWithBasicInfoAndOptions = [
      { id: -1, name: '기본정보', hasIndicator: false },
      { id: 0, name: '옵션', hasIndicator: false },
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
