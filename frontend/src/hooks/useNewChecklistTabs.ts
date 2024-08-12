import { useEffect, useState } from 'react';

import { TabWithCompletion } from '@/components/_common/Tabs/Tabs';
import useChecklistStore from '@/store/useChecklistStore';

const useNewChecklistTabs = () => {
  const { getCategoryQnA, validCategory, checklistCategoryQnA } = useChecklistStore();

  const [tabs, setTabs] = useState<TabWithCompletion[]>([]);

  const isCategoryQuestionAllCompleted = (targetId: number) => {
    const targetCategory = getCategoryQnA(targetId);

    if (targetCategory && targetCategory.questions.every(question => question.answer !== 'NONE')) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const newChecklistTabsWithCompletion = validCategory.map(category => ({
      id: category.categoryId,
      name: category.categoryName,
      hasIndicator: isCategoryQuestionAllCompleted(category.categoryId),
    }));

    const tabsWithBasicInfoAndOptions = [
      { id: -1, name: '기본정보', hasIndicator: false },
      { id: 0, name: '옵션', hasIndicator: false },
      ...newChecklistTabsWithCompletion,
    ];

    setTabs(tabsWithBasicInfoAndOptions);
  }, [validCategory, checklistCategoryQnA]);

  return { isCategoryQuestionAllCompleted, tabs };
};

export default useNewChecklistTabs;
