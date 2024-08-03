import QuestionCard from '@/components/ChecklistCustom/QuestionCard';
import { useTabContext } from '@/components/common/Tabs/TabContext';
import useChecklistStore from '@/store/useChecklistStore';

const QuestionCardList = () => {
  const { currentTabId } = useTabContext();
  const { categoryQnA } = useChecklistStore();

  const currentQuestions = categoryQnA(currentTabId);

  return (
    <>
      {currentQuestions.questions.map(question => {
        <QuestionCard question={question} />;
      })}
    </>
  );
};

export default QuestionCardList;
