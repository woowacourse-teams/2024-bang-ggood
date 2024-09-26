import { useCallback } from 'react';

import useChecklistStore from '@/store/useChecklistStore';
import { AnswerType } from '@/types/answer';
import { CategoryAndQuestion } from '@/types/checklist';

interface UpdateAnswerProps extends CategoryAndQuestion {
  newAnswer: AnswerType;
}

const useChecklistAnswer = () => {
  const checklistActions = useChecklistStore(store => store.actions);
  const checklistCategoryQnA = useChecklistStore(store => store.checklistCategoryQnA);

  const updateAndToggleAnswer = useCallback(
    ({ categoryId, questionId, newAnswer }: UpdateAnswerProps) => {
      const targetCategory = checklistActions.getCategory(categoryId);

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

        checklistActions.set(newCategories);
      }
    },
    [checklistActions, checklistCategoryQnA],
  );

  const findCategoryQuestion = useCallback(
    ({ categoryId, questionId }: CategoryAndQuestion) => {
      const targetCategory = checklistCategoryQnA?.find(category => category.categoryId === categoryId);

      if (!targetCategory) {
        throw new Error(`${categoryId}가 아이디인 카테고리를 찾을 수 없습니다.`);
      }

      const targetQuestion = targetCategory.questions.find(q => q.questionId === questionId);
      if (!targetQuestion) {
        throw new Error(`${categoryId}가 아이디인 카테고리 내에서 ${questionId}가 아이디인 질문을 찾을 수 없습니다.`);
      }

      return targetQuestion;
    },
    [checklistCategoryQnA],
  );

  return { updateAndToggleAnswer, findCategoryQuestion };
};

export default useChecklistAnswer;
