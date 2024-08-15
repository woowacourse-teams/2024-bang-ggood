import styled from '@emotion/styled';

import AnswerIcon from '@/components/Answer/AnswerIcon';
import { flexSpaceBetween } from '@/styles/common';
import { OneQuestionWithAnswer } from '@/types/checklist';

interface Props {
  QuestionAndAnswer: OneQuestionWithAnswer;
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
    padding: 16px;
    gap: 10px;

    background-color: ${({ theme }) => theme.palette.white};
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey200};
  `,
  Title: styled.div`
    display: flex;
    margin: 5px 0;

    font-size: ${({ theme }) => theme.text.size.medium};
    line-height: 1.5rem;
    align-items: baseline;

    gap: 10px;
  `,
  Subtitle: styled.div`
    margin-bottom: 10px;

    color: ${({ theme }) => theme.palette.grey500};
    font-size: ${({ theme }) => theme.text.size.small};
    line-height: 1.5;
    word-break: keep-all;
  `,
  TitleContainer: styled.div`
    display: flex;
    width: 80%;
    flex-direction: column;
    word-break: keep-all;
  `,
  AnswerContainer: styled.div`
    box-sizing: border-box;
  `,
};
