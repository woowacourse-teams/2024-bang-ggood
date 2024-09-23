import styled from '@emotion/styled';

import AnswerIcon from '@/components/Answer/AnswerIcon';
import { flexColumn, flexSpaceBetween } from '@/styles/common';
import { ChecklistQuestionWithAnswer } from '@/types/checklist';

interface Props {
  QuestionAndAnswer: ChecklistQuestionWithAnswer;
}

const ChecklistAnswer = ({ QuestionAndAnswer }: Props) => {
  const { title, subtitle, answer } = QuestionAndAnswer;

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>{title}</S.Title>
        {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
      </S.TitleContainer>
      <S.AnswerContainer>
        <AnswerIcon answer={answer} isSelected />
      </S.AnswerContainer>
    </S.Container>
  );
};

export default ChecklistAnswer;

const S = {
  Container: styled.div`
    ${flexSpaceBetween}
    width: 100%;
    padding: 1.6rem;
    gap: 1rem;

    background-color: ${({ theme }) => theme.palette.white};
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 0.1rem solid ${({ theme }) => theme.palette.grey200};
  `,
  Title: styled.div`
    display: flex;
    margin: 0.5rem 0;

    font-size: ${({ theme }) => theme.text.size.medium};
    align-items: baseline;

    gap: 1rem;
  `,
  Subtitle: styled.div`
    margin-bottom: 1rem;

    color: ${({ theme }) => theme.palette.grey500};
    font-size: ${({ theme }) => theme.text.size.small};

    word-break: keep-all;
  `,
  TitleContainer: styled.div`
    ${flexColumn}
    width: 80%;

    word-break: keep-all;
  `,
  AnswerContainer: styled.div`
    box-sizing: border-box;
  `,
};
