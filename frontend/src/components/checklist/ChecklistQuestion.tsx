import styled from '@emotion/styled';
import { useState } from 'react';

import { QuestionDot } from '@/assets/assets';
import FaceIcon from '@/components/FaceMark/FaceIcon';
import { ChecklistQuestion } from '@/types/checklist';

interface Props {
  question: ChecklistQuestion;
}

const ChecklistQuestion = ({ question }: Props) => {
  const [answer, setAnswer] = useState<null | number>(null);

  const handleClick = (newAnswer: number) => {
    setAnswer(answer === newAnswer ? null : newAnswer);
  };
  type Emotion = 'good' | 'bad' | 'soso';
  const emotions: Emotion[] = ['bad', 'soso', 'good'];
  return (
    <S.Container>
      <S.Title>
        <QuestionDot />
        {question.questionTitle}
      </S.Title>
      <S.Subtitle>•{question.questionSubtitle}</S.Subtitle>
      <S.Options>
        {emotions.map((emotion, i) => (
          <FaceIcon fill={answer === i + 1} key={emotion} emotion={emotion} onClick={() => handleClick(i + 1)} />
        ))}
      </S.Options>
    </S.Container>
  );
};

export default ChecklistQuestion;

// •
const S = {
  Container: styled.div`
    padding: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey200};
  `,
  Title: styled.div`
    display: flex;
    gap: 10px;

    font-size: ${({ theme }) => theme.text.size.medium};
    margin: 5px 0;
  `,
  Subtitle: styled.div`
    width: 80%;
    color: ${({ theme }) => theme.palette.grey500};
    font-size: ${({ theme }) => theme.text.size.small};
    margin-bottom: 10px;
    word-break: keep-all;
    line-height: 16px;
    margin-left: 20px;
  `,
  Options: styled.div`
    margin: 0 auto;
    width: 80%;
    display: flex;
    justify-content: space-between;
  `,
};
