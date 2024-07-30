import styled from '@emotion/styled';

//TODO: indicator 컴포넌트화 필요
import { QuestionDot } from '@/assets/assets';
import FaceMark from '@/components/common/FaceMark/FaceMark';
import useChecklist from '@/store/useChecklist';
import { ChecklistQuestion } from '@/types/checklist';
import { Emotion } from '@/types/emotionAnswer';

interface Props {
  question: ChecklistQuestion;
  questionSelectedAnswer: (questionId: number) => number | void;
}

export const emotionPhrase: Record<Emotion, string> = {
  BAD: '별로에요',
  SOSO: '평범해요',
  GOOD: '좋아요',
};

const ChecklistQuestion = ({ question, questionSelectedAnswer }: Props) => {
  const { questionId } = question;
  const { deleteAnswer, addAnswer } = useChecklist();
  const handleClick = (newAnswer: number) => {
    if (questionSelectedAnswer(questionId) === newAnswer) {
      deleteAnswer(questionId);
    } else {
      addAnswer({ questionId: questionId, newAnswer });
    }
  };

  interface Emotions {
    name: Emotion;
    id: number;
  }

  const emotions: Emotions[] = [
    { name: 'BAD', id: 1 },
    { name: 'SOSO', id: 2 },
    { name: 'GOOD', id: 3 },
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
              <FaceMark.FaceIcon emotion={emotionName} isFilled={questionSelectedAnswer(questionId) === id} />
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
    line-height: 1.5;
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
