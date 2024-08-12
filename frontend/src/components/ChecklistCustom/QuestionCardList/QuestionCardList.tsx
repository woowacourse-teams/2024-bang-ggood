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
          <S.Box key={`${currentTabId}-${questionId}-custom`}>
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
  QuestionList: styled.div`
    width: calc(100% - 32px);
    height: fit-content;
    margin-top: 10px;

    background-color: ${({ theme }) => theme.palette.white};

    border-radius: 10px;
  `,
  Box: styled.div`
    width: 100%;
  `,
};