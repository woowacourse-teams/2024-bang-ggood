import styled from '@emotion/styled';
import { useState } from 'react';

import { QuestionDot } from '@/assets/assets';
import FaceMark from '@/components/common/FaceMark/FaceMark';
import { addAnswerProps } from '@/pages/ChecklistPage';
import { ChecklistQuestion } from '@/types/checklist';

interface Props {
  question: ChecklistQuestion;
  addAnswer: ({ questionId, newAnswer }: addAnswerProps) => void;
  deleteAnswer: (questionId: number) => void;
}
type Emotion = 'bad' | 'soso' | 'good';
const emotionPhrase: Record<Emotion, string> = {
  bad: '별로에요',
  soso: '평범해요',
  good: '좋아요',
};
const ChecklistQuestion = ({ question, addAnswer, deleteAnswer }: Props) => {
  const [answer, setAnswer] = useState<null | number>(null);

  const handleClick = (newAnswer: number) => {
    if (answer === newAnswer) {
      setAnswer(null);
      deleteAnswer(question.questionId);
    } else {
      setAnswer(newAnswer);
      addAnswer({ questionId: question.questionId, newAnswer });
    }
  };

  type Emotion = 'good' | 'bad' | 'soso';

  interface Emotions {
    name: Emotion;
    id: number;
  }

  const emotions: Emotions[] = [
    { name: 'bad', id: 1 },
    { name: 'soso', id: 2 },
    { name: 'good', id: 3 },
  ];

  return (
    <S.Container>
      <S.Title>
        <QuestionDot />
        {question?.title}
      </S.Title>
      {question?.subtitle && <S.Subtitle>•{question?.subtitle}</S.Subtitle>}
      <S.Options>
        {emotions.map(emotion => {
          const { name: emotionName, id } = emotion;
          return (
            <FaceMark onClick={() => handleClick(id)} key={id}>
              <FaceMark.FaceIcon emotion={emotionName} isFilled={answer === id} />
              <FaceMark.Footer>{emotionPhrase[emotionName]}</FaceMark.Footer>
            </FaceMark>
          );
        })}
      </S.Options>
    </S.Container>
  );
};

export default ChecklistQuestion;

const S = {
  Container: styled.div`
    padding: 16px;
  `,
  Title: styled.div`
    display: flex;

    margin: 5px 0;

    font-size: ${({ theme }) => theme.text.size.medium};
    gap: 10px;
  `,
  Subtitle: styled.div`
    width: 80vw;
    margin-bottom: 10px;
    margin-left: 20px;

    color: ${({ theme }) => theme.palette.grey500};
    font-size: ${({ theme }) => theme.text.size.small};
    line-height: 1.5;
    word-break: keep-all;
  `,
  Options: styled.div`
    display: flex;
    width: 80%;
    margin: 0 auto;
    margin-top: 10px;
    justify-content: space-between;
  `,
};
