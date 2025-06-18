import styled from '@emotion/styled';
import React from 'react';

import { ChecklistQuestion } from '@/types/checklist';
import { fontStyle } from '@/utils/fontStyle';

type FontSize = 'medium' | 'small';
interface Props {
  question: ChecklistQuestion;
  width?: string;
  fontSize?: FontSize;
}

const ChecklistQuestionItem = ({ question, width = '100%', fontSize = 'medium' }: Props) => {
  return (
    <S.Question className="question" width={width} fontSize={fontSize}>
      {question.title}
    </S.Question>
  );
};

export default React.memo(ChecklistQuestionItem);

const S = {
  Question: styled.div<{ width: string; fontSize: FontSize }>`
    display: flex;
    width: ${({ width }) => width};
    flex-flow: column wrap;
    ${({ theme, fontSize }) =>
      fontSize === 'medium' ? fontStyle(theme.font.headline[2].B) : fontStyle(theme.font.headline[2].R)}
  `,
};
