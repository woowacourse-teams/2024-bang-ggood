import React, { useCallback } from 'react';

import { useTabContext } from '@/components/_common/Tabs/TabContext';
import AnswerIcon from '@/components/Answer/AnswerIcon';
import { ANSWER_OPTIONS } from '@/constants/answer';
import useChecklistQuestion from '@/hooks/useChecklistQuestion';
import { Answer, AnswerType } from '@/types/answer';

const ChecklistQuestionAnswers = ({ answer, questionId }: { answer: AnswerType; questionId: number }) => {
  const { toggleAnswer } = useChecklistQuestion();
  const { currentTabId } = useTabContext();

  const handleClick = useCallback(
    (newAnswer: AnswerType) => {
      toggleAnswer({ categoryId: currentTabId, questionId: questionId, newAnswer });
    },
    [currentTabId, questionId, toggleAnswer],
  );

  return (
    <>
      {ANSWER_OPTIONS.map((option: Answer) => {
        const isSelected = answer === option.name;

        return (
          <AnswerIcon
            answer={option.name}
            isSelected={isSelected}
            onClick={() => handleClick(option.name)}
            key={`${questionId}-${option.id}`}
          />
        );
      })}
    </>
  );
};

export default React.memo(ChecklistQuestionAnswers);
