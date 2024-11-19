import styled from '@emotion/styled';
import React from 'react';

import HighlightText from '@/components/_common/Highlight/HighlightText';
import { flexCenter, flexRow, flexSpaceBetween } from '@/styles/common';
import { ChecklistQuestion } from '@/types/checklist';

interface Props {
  question: ChecklistQuestion;
  width?: string;
}

const ChecklistQuestionItem = ({ question, width = '100%' }: Props) => {
  const { title, highlights } = question;

  return (
    <S.Question className="question" width={width}>
      <HighlightText title={title} highlights={highlights} />
    </S.Question>
  );
};

export default React.memo(ChecklistQuestionItem);

const S = {
  Question: styled.div<{ width: string }>`
    display: flex;
    width: ${({ width }) => width};
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
