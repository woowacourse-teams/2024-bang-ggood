import { TabWithCompletion } from '@/components/_common/Tabs/Tabs';
import { findCategoryClassNameByName } from '@/constants/category';
import { Category } from '@/types/category';

const useTabs = () => {
  const getTabs = (categories: Category[]) => {
    return categories.map(category => ({
      id: category.categoryId,
      name: category.categoryName as string,
      className: findCategoryClassNameByName(category.categoryName),
    })) as TabWithCompletion[];
  };

  return {
    getTabs,
  };
};

export default useTabs;
