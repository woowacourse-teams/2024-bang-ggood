import QuestionSelectCard from '@/components/ChecklistCustom/QuestionSelectCard/QuestionSelectCard';
import { useTabContext } from '@/components/common/Tabs/TabContext';
import useChecklistCustomStore from '@/store/useChecklistCustomStore';

const QuestionCardList = () => {
  const { currentTabId } = useTabContext();
  const { categoryQnA } = useChecklistCustomStore();

  const currentQuestions = categoryQnA(currentTabId);

  return (
    <>
      {currentQuestions.questions.map(question => {
        <QuestionSelectCard question={question} />;
      })}
    </>
  );
};

export default QuestionCardList;
