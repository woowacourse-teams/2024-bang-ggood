import styled from '@emotion/styled';
import React from 'react';

import HighlightText from '@/components/_common/Highlight/HighlightText';
import { ChecklistQuestion } from '@/types/checklist';

type FontSize = 'medium' | 'small';
interface Props {
  question: ChecklistQuestion;
  width?: string;
  fontSize?: FontSize;
}

const ChecklistQuestionItem = ({ question, width = '100%', fontSize = 'medium' }: Props) => {
  const { title, highlights } = question;

  return (
    <S.Question className="question" width={width}>
      <HighlightText fontSize={fontSize} title={title} highlights={highlights} />
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
};
