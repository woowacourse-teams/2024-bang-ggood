import { useTabContext } from '@/components/_common/Tabs/TabContext';
import QuestionCardList from '@/components/ChecklistCustom/QuestionCardList/QuestionCardList';
import useChecklistCustomStore from '@/store/useChecklistCustomStore';

const QuestionListTemplate = () => {
  const { categoryQnA } = useChecklistCustomStore();
  const { currentTabId } = useTabContext();

  const currentCategoryQnA = categoryQnA(currentTabId);

  return (
    <QuestionCardList
      key={`${currentTabId}-customlist`}
      currentTabId={currentTabId}
      questions={currentCategoryQnA?.questions}
    />
  );
};

export default QuestionListTemplate;
