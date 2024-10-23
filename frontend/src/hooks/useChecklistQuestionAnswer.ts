import { useState } from 'react';

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
  const [statusMessage, setStatusMessage] = useState('');

  const toggleAnswer = ({ categoryId, questionId, newAnswer }: UpdateAnswerProps) => {
    const { category } = checklistActions.getCategoryAndQuestion({ categoryId, questionId });

    const updatedAnswer = {
      ...category,
      questions: category.questions.map(question => {
        if (question.questionId !== questionId) return question;

        const isAnswerSelected = question.answer === newAnswer;
        const updatedAnswer = isAnswerSelected ? 'NONE' : newAnswer;

        const ariaLabel = `${updatedAnswer === 'NONE' ? '선택이 해제되었습니다' : updatedAnswer === 'BAD' ? '싫어요가 선택되었습니다.' : '좋아요가 선택되었습니다.'}`;

        setStatusMessage(ariaLabel);

        return {
          ...question,
          answer: updatedAnswer,
        };
      }),
    };

    const newCategoryQnA = checklistCategoryQnA.map(category =>
      category.categoryId === categoryId ? updatedAnswer : category,
    );

    checklistActions.set(newCategoryQnA);
  };

  return { toggleAnswer, statusMessage };
};

export default useChecklistQuestionAnswer;
