import useChecklistStore from '@/store/useChecklistStore';
import { AnswerType } from '@/types/answer';
import { CategoryAndQuestion } from '@/types/checklist';

interface UpdateAnswerProps extends CategoryAndQuestion {
  newAnswer: AnswerType;
}

const useChecklistAnswer = () => {
  const { setAnswers, checklistCategoryQnA, categoryQnA } = useChecklistStore();

  const updateAndToggleAnswer = ({ categoryId, questionId, newAnswer }: UpdateAnswerProps) => {
    const targetCategory = categoryQnA(categoryId);

    if (targetCategory) {
      const updatedCategory = {
        ...targetCategory,
        questions: targetCategory.questions.map(question => {
          if (question.questionId === questionId) {
            return { ...question, answer: question.answer === newAnswer ? 'NONE' : newAnswer };
          }
          return question;
        }),
      };

      const newCategories = checklistCategoryQnA.map(category =>
        category.categoryId === categoryId ? updatedCategory : category,
      );

      setAnswers(newCategories);
    }
  };

  const findCategoryQuestion = ({ categoryId, questionId }: CategoryAndQuestion) => {
    const targetCategory = checklistCategoryQnA?.find(category => category.categoryId === categoryId);

    if (!targetCategory) {
      throw new Error(`${categoryId}가 아이디인 카테고리를 찾을 수 없습니다.`);
    }

    const targetQuestion = targetCategory.questions.find(q => q.questionId === questionId);
    if (!targetQuestion) {
      throw new Error(`${categoryId}가 아이디인 카테고리 내에서 ${questionId}가 아이디인 질문을 찾을 수 없습니다.`);
    }

    return targetQuestion;
  };

  return { updateAndToggleAnswer, findCategoryQuestion };
};

export default useChecklistAnswer;
