import React, { useCallback } from 'react';

import { useTabContext } from '@/components/_common/Tabs/TabContext';
import AnswerIcon from '@/components/Answer/AnswerIcon';
import { ANSWER_OPTIONS } from '@/constants/answer';
import useChecklistAnswer from '@/hooks/useChecklistAnswer';
import { Answer, AnswerType } from '@/types/answer';

const ChecklistQuestionAnswers = ({ answer, questionId }: { answer: AnswerType; questionId: number }) => {
  const { updateAndToggleAnswer: updateAnswer } = useChecklistAnswer();
  const { currentTabId } = useTabContext();

  const handleClick = useCallback(
    (newAnswer: AnswerType) => {
      updateAnswer({ categoryId: currentTabId, questionId: questionId, newAnswer });
    },
    [currentTabId, questionId, updateAnswer],
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

const ChecklistQuestionAnswersMemo = React.memo(ChecklistQuestionAnswers, (prevProps, nextProps) => {
  return prevProps.answer === nextProps.answer && prevProps.questionId === nextProps.questionId;
});

export default ChecklistQuestionAnswersMemo;
