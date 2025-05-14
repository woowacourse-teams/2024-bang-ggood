import styled from '@emotion/styled';

import Divider from '@/components/_common/Divider/Divider';
import QuestionSelectCard from '@/components/ChecklistQuestionSelect/QuestionSelectCard/QuestionSelectCard';
import { ChecklistQuestionWithIsSelected } from '@/types/checklist';

interface Props {
  currentTabId: number;
  questions: ChecklistQuestionWithIsSelected[];
}
const QuestionCardList = ({ questions, currentTabId }: Props) => {
  return (
    <S.QuestionList>
      {questions?.map((question, index) => {
        return (
          <S.Box key={`${currentTabId}-${question.questionId}-custom`}>
            <QuestionSelectCard question={question} />
            {index !== questions.length - 1 && <Divider isBold={true} />}
          </S.Box>
        );
      })}
    </S.QuestionList>
  );
};

export default QuestionCardList;

const S = {
  QuestionList: styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    height: fit-content;

    border-radius: 0.8rem;
  `,
  Box: styled.div`
    width: 100%;
  `,
};
