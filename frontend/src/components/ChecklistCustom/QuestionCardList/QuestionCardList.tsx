import styled from '@emotion/styled';

import QuestionSelectCard from '@/components/ChecklistCustom/QuestionSelectCard/QuestionSelectCard';
import Divider from '@/components/_common/Divider/Divider';
import { ChecklistQuestionWithIsChecked } from '@/types/checklist';

interface Props {
  currentTabId: number;
  questions: ChecklistQuestionWithIsChecked[];
}
const QuestionCardList = ({ questions, currentTabId }: Props) => {
  return (
    <S.QuestionList>
      {questions?.map((question, index) => {
        const { questionId } = question;
        return (
          <>
            <QuestionSelectCard question={question} key={`${currentTabId}-${questionId}`} />
            {index !== questions.length - 1 && <Divider isBold={true} />}
          </>
        );
      })}
    </S.QuestionList>
  );
};

export default QuestionCardList;

const S = {
  QuestionList: styled.div`
    width: 90%;
    height: fit-content;
    margin-top: 10px;

    background-color: ${({ theme }) => theme.palette.white};

    border-radius: 10px;
  `,
};
