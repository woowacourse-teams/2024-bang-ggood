import styled from '@emotion/styled';

import Divider from '@/components/_common/Divider/Divider';
import QuestionSelectCard from '@/components/ChecklistCustom/QuestionSelectCard/QuestionSelectCard';
import { ChecklistQuestionWithIsSelected } from '@/types/checklist';

interface Props {
  currentTabId: number;
  questions: ChecklistQuestionWithIsSelected[];
}
const QuestionCardList = ({ questions, currentTabId }: Props) => {
  return (
    <S.QuestionList>
      {questions?.map((question, index) => {
        const { questionId } = question;
        return (
          <div key={`${currentTabId}-${questionId}-custom`}>
            <QuestionSelectCard question={question} />
            {index !== questions.length - 1 && <Divider isBold={true} />}
          </div>
        );
      })}
    </S.QuestionList>
  );
};

export default QuestionCardList;

const S = {
  QuestionList: styled.div`
    height: fit-content;
    margin-top: 10px;

    background-color: ${({ theme }) => theme.palette.white};
    max-width: 90%;

    border-radius: 10px;
  `,
};
