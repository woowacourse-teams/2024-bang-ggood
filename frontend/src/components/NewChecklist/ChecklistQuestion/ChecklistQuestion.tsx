import styled from '@emotion/styled';
import React from 'react';

import HighlightText from '@/components/_common/Highlight/HighlightText';
import ChecklistQuestionAnswers from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestionAnswers';
import { flexCenter, flexRow, flexSpaceBetween } from '@/styles/common';
import { AnswerType } from '@/types/answer';
import { ChecklistQuestion } from '@/types/checklist';

interface Props {
  question: ChecklistQuestion;
  answer: AnswerType;
}

const ChecklistQuestionItem = ({ answer, question }: Props) => {
  const { questionId, title, highlights } = question;

  return (
    <S.Container>
      <S.Question>
        <HighlightText title={title} highlights={highlights} />
      </S.Question>
      <S.Options>
        <ChecklistQuestionAnswers answer={answer} questionId={questionId} />
      </S.Options>
    </S.Container>
  );
};

const ChecklistQuestionItemMemo = React.memo(ChecklistQuestionItem, (prevProps, nextProps) => {
  return prevProps.answer === nextProps.answer && prevProps.question.questionId === nextProps.question.questionId;
});

export default ChecklistQuestionItemMemo;

const S = {
  Container: styled.div`
    position: relative;
    width: 100%;
    ${flexRow}
    ${flexSpaceBetween}
    padding: 1.6rem;
    gap: 0.5rem;

    box-sizing: border-box;

    background-color: ${({ theme }) => theme.palette.white};
    border-radius: 0.8rem;
  `,
  Question: styled.div`
    display: flex;
    width: 80%;
    flex-flow: column wrap;
  `,
  Subtitle: styled.div`
    width: 100%;

    color: ${({ theme }) => theme.palette.grey500};
    font-size: ${({ theme }) => theme.text.size.small};
    word-break: keep-all;
  `,
  Options: styled.div`
    width: 8rem;

    ${flexRow}
    gap: 1.5rem;

    ${flexSpaceBetween}
    align-items: center;
    cursor: pointer;
  `,
  ButtonBox: styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    ${flexCenter}

    :hover {
      background-color: ${({ theme }) => theme.palette.background};
    }
  `,
};
