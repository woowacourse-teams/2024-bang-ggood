import styled from '@emotion/styled';

import { QuestionDot } from '@/assets/assets';
import FaceMark from '@/components/common/FaceMark/FaceMark';
import QuestionMemo from '@/components/NewChecklist/ChecklistQuestion/QuestionMemo';
import { EMOTION_PHARSE, EMOTIONS } from '@/constants/emotion';
import useInputs from '@/hooks/useInput';
import useChecklistStore from '@/store/useChecklistStore';
import { ChecklistQuestion } from '@/types/checklist';
import { EmotionType } from '@/types/emotionAnswer';

interface Props {
  question: ChecklistQuestion;
}

const ChecklistQuestion = ({ question }: Props) => {
  const { questionId } = question;
  const { deleteAnswer, addAnswer, questionSelectedAnswer } = useChecklistStore();

  const {
    values: { text },
    onChange,
  } = useInputs({ text: '' });

  const handleClick = (newAnswer: EmotionType) => {
    if (questionSelectedAnswer(questionId) === newAnswer) {
      deleteAnswer(questionId);
    } else {
      addAnswer({ questionId: questionId, newAnswer });
    }
  };

  return (
    <S.Container>
      <S.Title>
        <QuestionDot />
        {question?.title}
      </S.Title>
      {question?.subtitle && <S.Subtitle>•{question?.subtitle}</S.Subtitle>}

      <S.Options>
        {EMOTIONS.map(emotion => {
          const { name: emotionName, id } = emotion;
          return (
            <FaceMark onClick={() => handleClick(emotionName)} key={id}>
              <FaceMark.FaceIcon emotion={emotionName} isFilled={questionSelectedAnswer(questionId) === emotionName} />
              <FaceMark.Footer>{EMOTION_PHARSE[emotionName]}</FaceMark.Footer>
            </FaceMark>
          );
        })}
      </S.Options>
      <QuestionMemo text={text} onChange={onChange} />
    </S.Container>
  );
};

export default ChecklistQuestion;

const S = {
  Container: styled.div`
    position: relative;
    padding: 16px;

    background-color: ${({ theme }) => theme.palette.white};
    border-radius: 8px;
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
