import useChecklistStore from '@/store/useChecklistStore';
import { AnswerType } from '@/types/answer';
import { CategoryAndQuestion } from '@/types/checklist';

interface UpdateAnswerProps extends CategoryAndQuestion {
  newAnswer: AnswerType;
}
/**
 * useChecklistQuestionAnswer : 체크리스트의 답변을 설정하는 훅입니다.
 * - toggleAnswer : 질문의 답변을 수정하고 전역에 반영하는 함수입니다.
 */

const useChecklistQuestionAnswer = () => {
  const checklistActions = useChecklistStore(store => store.actions);
  const checklistCategoryQnA = useChecklistStore(store => store.checklistCategoryQnA);

  const toggleAnswer = ({ categoryId, questionId, newAnswer }: UpdateAnswerProps) => {
    const { category } = checklistActions.getCategoryAndQuestion({ categoryId, questionId });

    const updatedCategory = {
      ...category,
      questions: category.questions.map(question =>
        question.questionId === questionId
          ? { ...question, answer: question.answer === newAnswer ? 'NONE' : newAnswer }
          : question,
      ),
    };

    const newCategories = checklistCategoryQnA.map(category =>
      category.categoryId === categoryId ? updatedCategory : category,
    );

    checklistActions.set(newCategories);
  };

  return { toggleAnswer };
};

export default useChecklistQuestionAnswer;
