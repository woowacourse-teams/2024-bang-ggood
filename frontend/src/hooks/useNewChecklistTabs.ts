import { useCallback, useEffect, useState } from 'react';

import { TabWithCompletion } from '@/components/_common/Tabs/Tabs';
import { findCategoryClassNameByName } from '@/constants/category';
import useChecklistStore from '@/store/useChecklistStore';

const useNewChecklistTabs = () => {
  const { getCategoryQnA, validCategory, checklistCategoryQnA } = useChecklistStore();

  const [tabs, setTabs] = useState<TabWithCompletion[]>([]);

  const isCategoryQuestionAllCompleted = useCallback(
    (targetId: number) => {
      const targetCategory = getCategoryQnA(targetId);
      return targetCategory?.questions.every(question => question.answer !== 'NONE');
    },
    [getCategoryQnA],
  );

  useEffect(() => {
    const newChecklistTabsWithCompletion = validCategory.map(category => ({
      id: category.categoryId,
      name: category.categoryName,
      className: findCategoryClassNameByName(category.categoryName),
      hasIndicator: !isCategoryQuestionAllCompleted(category.categoryId),
    }));

    const tabsWithBasicInfoAndOptions = [
      { id: -1, name: '기본정보', hasIndicator: false },
      { id: 0, name: '옵션', hasIndicator: false },
      ...newChecklistTabsWithCompletion,
    ];

    const newTabsString = JSON.stringify(tabsWithBasicInfoAndOptions);
    const prevTabsString = JSON.stringify(tabs);
    if (newTabsString !== prevTabsString) {
      setTabs(tabsWithBasicInfoAndOptions);
    }
  }, [validCategory, checklistCategoryQnA, isCategoryQuestionAllCompleted]);

  return { tabs };
};

export default useNewChecklistTabs;
