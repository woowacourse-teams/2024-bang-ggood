import useChecklistStore from '@/store/useChecklistStore';
import { EmotionType } from '@/types/emotionAnswer';

export interface Props {
  questionId: number;
  categoryId: number;
}

export interface UpdateAnswerProps extends Props {
  newAnswer: EmotionType;
}

export interface updateMemoProps extends Props {
  newMemo: string | null;
}

const useChecklistAnswer = () => {
  const { setAnswers, checklistCategoryQnA } = useChecklistStore();

  const updateAnswer = ({ categoryId, questionId, newAnswer }: UpdateAnswerProps) => {
    const targetCategory = checklistCategoryQnA.find(category => category.categoryId === categoryId);

    if (targetCategory) {
      const updatedCategory = {
        ...targetCategory,
        questions: targetCategory.questions.map(question =>
          question.questionId === questionId ? { ...question, answer: newAnswer } : question,
        ),
      };

      const newCategories = checklistCategoryQnA.map(category =>
        category.categoryId === categoryId ? updatedCategory : category,
      );

      setAnswers(newCategories);
    }
  };
  const updateMemo = ({ categoryId, questionId, newMemo }: updateMemoProps) => {
    const targetCategory = checklistCategoryQnA.find(category => category.categoryId === categoryId);

    if (targetCategory) {
      const updatedCategory = {
        ...targetCategory,
        questions: targetCategory.questions.map(question =>
          question.questionId === questionId ? { ...question, memo: newMemo } : question,
        ),
      };

      const newCategories = checklistCategoryQnA.map(category =>
        category.categoryId === categoryId ? updatedCategory : category,
      );

      setAnswers(newCategories);
    }
  };
  const findCategoryQuestion = ({ categoryId, questionId }: Props) => {
    const targetCategory = checklistCategoryQnA?.find(category => category.categoryId === categoryId);

    if (targetCategory) {
      const targetQuestion = targetCategory.questions.find(q => q.questionId === questionId);
      if (targetQuestion) {
        return targetQuestion;
      }
    }

    return null;
  };

  return { updateAnswer, updateMemo, findCategoryQuestion };
};

export default useChecklistAnswer;
