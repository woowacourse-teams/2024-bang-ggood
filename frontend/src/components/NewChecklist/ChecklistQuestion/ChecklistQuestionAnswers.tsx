import React, { useCallback } from 'react';

import { useTabContext } from '@/components/_common/Tabs/TabContext';
import AnswerIcon from '@/components/Answer/AnswerIcon';
import { ANSWER_OPTIONS } from '@/constants/answer';
import useChecklistQuestionAnswer from '@/hooks/useChecklistQuestionAnswer';
import { trackChecklistQuestion } from '@/service/amplitude/trackEvent';
import { Answer, AnswerType } from '@/types/answer';

interface Props {
  questionId: number;
  answer: AnswerType;
}

const ChecklistQuestionAnswers = ({ questionId, answer }: Props) => {
  const { currentTabId } = useTabContext();
  const { toggleAnswer } = useChecklistQuestionAnswer();

  const handleClick = useCallback(
    (newAnswer: AnswerType) => {
      toggleAnswer({ categoryId: currentTabId, questionId: questionId, newAnswer });
      trackChecklistQuestion(questionId);
    },
    [currentTabId, questionId, toggleAnswer],
  );

  return (
    <>
      {ANSWER_OPTIONS.map((option: Answer) => {
        const isSelected = answer === option.name;

        return (
          <AnswerIcon
            role="button"
            answer={option.name}
            isSelected={isSelected}
            onClick={() => handleClick(option.name)}
            key={`${questionId}-${option.id}`}
            aria-label={option.name === 'GOOD' ? '좋아요 버튼' : '싫어요 버튼'}
          />
        );
      })}
    </>
  );
};

export default React.memo(ChecklistQuestionAnswers);
