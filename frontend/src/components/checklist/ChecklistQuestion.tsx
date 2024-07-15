import styled from '@emotion/styled';

import { QuestionDot } from '@/assets/assets';
import { ChecklistQuestion } from '@/types/checklist';

interface Props {
  question: ChecklistQuestion;
}

const ChecklistQuestion = ({ question }: Props) => {
  return (
    <S.Container>
      <S.Title>
        <QuestionDot />
        {question.questionTitle}
      </S.Title>
    </S.Container>
  );
};

export default ChecklistQuestion;

const S = {
  Container: styled.div`
    padding: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey200};
  `,
  Title: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;

    font-size: ${({ theme }) => theme.text.size.small};
  `,
};
