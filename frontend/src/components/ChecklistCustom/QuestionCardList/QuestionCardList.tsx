import styled from '@emotion/styled';

import QuestionSelectCard from '@/components/ChecklistCustom/QuestionSelectCard/QuestionSelectCard';
import Divider from '@/components/common/Divider/Divider';
import { ChecklistQuestionWithIsChecked } from '@/types/checklist';

const QuestionCardList = ({ questions }: { questions: ChecklistQuestionWithIsChecked[] }) => {
  return (
    <S.Container>
      {questions.map(question => {
        return (
          <>
            <QuestionSelectCard question={question} />
            <Divider />
          </>
        );
      })}
    </S.Container>
  );
};

export default QuestionCardList;

const S = {
  Container: styled.div`
    width: 100%;

    background-color: ${({ theme }) => theme.palette.white};
    border-radius: 10px;
  `,
};
