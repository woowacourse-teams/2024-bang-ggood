import { useState } from 'react';

import useChecklistQuestionSelectStore from '@/store/useChecklistQuestionSelectStore';
import { CategoryAndQuestion } from '@/types/checklist';

export interface UpdateCheckProps extends CategoryAndQuestion {
  isSelected: boolean;
}

const useChecklistQuestionSelect = () => {
  const { setChecklistAllQuestionList, checklistAllQuestionList } = useChecklistQuestionSelectStore();
  const [statusMessage, setStatusMessage] = useState('');

  const toggleQuestionSelect = ({ categoryId, questionId, isSelected }: UpdateCheckProps) => {
    const targetCategory = checklistAllQuestionList.find(category => category.categoryId === categoryId);

    if (targetCategory) {
      const updatedCategory = {
        ...targetCategory,
        questions: targetCategory.questions.map(question =>
          question.questionId === questionId ? { ...question, isSelected } : question,
        ),
      };

      const newCategories = checklistAllQuestionList.map(category =>
        category.categoryId === categoryId ? updatedCategory : category,
      );

      setStatusMessage(isSelected ? '질문이 선택되었습니다' : '질문 선택이 취소되었습니다.');

      setChecklistAllQuestionList(newCategories);
    }
  };

  return { toggleQuestionSelect, statusMessage };
};

export default useChecklistQuestionSelect;
