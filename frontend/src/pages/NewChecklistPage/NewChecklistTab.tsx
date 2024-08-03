import Tabs from '@/components/common/Tabs/Tabs';
import useChecklistStore from '@/store/useChecklistStore';
import { Tab } from '@/types/tab';

const NewChecklistTab = ({ newChecklistTabs }: { newChecklistTabs: Tab[] }) => {
  const { checklistCategoryQnA } = useChecklistStore();

  const isCategoryQuestionAllCompleted = (targetId: number) => {
    const targetCartegory = checklistCategoryQnA.filter(category => category.categoryId === targetId)[0];
    if (targetCartegory) {
      return !targetCartegory.questions.find(question => question.grade === null);
    }
    return true;
  };

  const newChecklistTabsWithCompletion = newChecklistTabs.map(category => ({
    ...category,
    isCompleted: isCategoryQuestionAllCompleted(category.id),
  }));

  return <div>{<Tabs tabList={newChecklistTabsWithCompletion} />}</div>;
};

export default NewChecklistTab;
