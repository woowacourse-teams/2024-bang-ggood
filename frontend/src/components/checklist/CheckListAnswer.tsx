import styled from '@emotion/styled';

import { QuestionDot } from '@/assets/assets';
import FaceIcon from '@/components/FaceMark/FaceIcon';
import { ChecklistAnswer } from '@/types/checklist';

type Emotion = 'good' | 'bad' | 'soso';

interface Emotions {
  name: Emotion;
  id: number;
}

function getEmotionNameById(id: number): Emotion | null {
  const emotions: Emotions[] = [
    { name: 'bad', id: 1 },
    { name: 'soso', id: 2 },
    { name: 'good', id: 3 },
  ];

  const emotion = emotions.find(e => e.id === id);
  return emotion ? emotion.name : null;
}

interface Props {
  QandA: ChecklistAnswer;
}

const ChecklistAnswer = ({ QandA }: Props) => {
  const emotionName = getEmotionNameById(QandA.answer);

  return (
    <S.Container>
      <div>
        <S.Title>
          <QuestionDot />
          {QandA.questionTitle}
        </S.Title>
        <S.Subtitle>•{QandA.questionSubtitle}</S.Subtitle>
      </div>
      <S.Answer>
        <FaceIcon emotion={emotionName} fill={true} />
      </S.Answer>
    </S.Container>
  );
};

export default ChecklistAnswer;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    box-sizing: border-box;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey200};
    background-color: ${({ theme }) => theme.palette.white};
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
    line-height: 1.5;
    margin-left: 20px;
  `,
  Answer: styled.div`
    width: 80px;
  `,
};
