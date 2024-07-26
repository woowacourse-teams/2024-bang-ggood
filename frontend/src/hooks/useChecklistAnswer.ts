import { useCallback, useState } from 'react';

import { addAnswerProps } from '@/pages/ChecklistSummaryPage';
import { ChecklistFormAnswer } from '@/types/checklist';

const useChecklistAnswer = () => {
  const [checklistAnswers, setChecklistAnswers] = useState<ChecklistFormAnswer[]>([]);

  const questionSelectedAnswer = (targetId: number) => {
    const targetQuestion = checklistAnswers.filter(e => e.questionId === targetId);
    if (!targetQuestion[0]) return;
    return targetQuestion[0]?.answer;
  };

  const addAnswer = useCallback(
    ({ questionId, newAnswer }: addAnswerProps) => {
      const target = [...checklistAnswers].find(answer => answer.questionId === questionId);
      if (target) {
        const newAnswers = [...checklistAnswers].map(answer =>
          answer.questionId === questionId ? { questionId, answer: newAnswer } : answer,
        );
        setChecklistAnswers(newAnswers);
        return;
      }
      setChecklistAnswers(prev => [...prev, { questionId, answer: newAnswer }]);
    },
    [checklistAnswers],
  );

  const deleteAnswer = (questionId: number) => {
    setChecklistAnswers(prevAnswers => {
      return prevAnswers.filter(answer => answer.questionId !== questionId);
    });
  };

  return { addAnswer, deleteAnswer, questionSelectedAnswer, checklistAnswers };
};

export default useChecklistAnswer;
