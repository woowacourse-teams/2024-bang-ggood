import QuestionCardList from '@/components/ChecklistCustom/QuestionCardList/QuestionCardList';
import { useTabContext } from '@/components/common/Tabs/TabContext';
import useChecklistCustomStore from '@/store/useChecklistCustomStore';

const QuestionListTemplate = () => {
  const { categoryQnA } = useChecklistCustomStore();
  const { currentTabId } = useTabContext();

  const currentCategoryQnA = categoryQnA(currentTabId);

  return <QuestionCardList currentTabId={currentTabId} questions={currentCategoryQnA?.questions} />;
};

export default QuestionListTemplate;
