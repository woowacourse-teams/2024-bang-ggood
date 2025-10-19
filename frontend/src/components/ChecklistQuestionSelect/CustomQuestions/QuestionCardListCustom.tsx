import styled from '@emotion/styled';

import Divider from '@/components/_common/Divider/Divider';
import QuestionSelectCard from '@/components/ChecklistQuestionSelect/QuestionSelectCard/QuestionSelectCard';
import { flexColumn } from '@/styles/common';
import { ChecklistQuestionWithIsSelected } from '@/types/checklist';

interface Props {
  currentTabId: number;
  questions: ChecklistQuestionWithIsSelected[];
  onSelect: (id: number) => void;
  selectedIds: number[];
}
const QuestionCardListCustom = ({ questions, currentTabId, onSelect, selectedIds }: Props) => {
  return (
    <S.QuestionList>
      {questions?.map((question, index) => {
        const isSelected = selectedIds.includes(question.questionId);
        return (
          <S.Box key={`${currentTabId}-${question.questionId}-custom`}>
            {isSelected}
            <QuestionSelectCard question={{ ...question, isSelected }} onSelect={() => onSelect(question.questionId)} />
            {index !== questions.length - 1 && <Divider isBold={true} />}
          </S.Box>
        );
      })}
    </S.QuestionList>
  );
};

export default QuestionCardListCustom;

const S = {
  QuestionList: styled.section`
    ${flexColumn}
    gap: 1rem;
    width: 100%;
    height: fit-content;

    border-radius: 0.8rem;
  `,
  Box: styled.div`
    width: 100%;
  `,
};
