import styled from '@emotion/styled';

import { ArrowDownSmall, MemoFilled, MemoPlus, QuestionDot } from '@/assets/assets';
import Accordion from '@/components/common/Accordion/Accordion';
import FaceMark from '@/components/common/FaceMark/FaceMark';
import { emotionPhrase } from '@/constants/emotion';
import useChecklistStore from '@/store/useChecklistStore';
import { ChecklistQuestion } from '@/types/checklist';
import { Emotion, EmotionType } from '@/types/emotionAnswer';

interface Props {
  question: ChecklistQuestion;
}

export const MemoToggleButton = ({ hasMemo }: { hasMemo: boolean }) => {
  return hasMemo ? <MemoPlus /> : <MemoFilled />;
};

const ChecklistQuestion = ({ question }: Props) => {
  const { questionId } = question;
  const { deleteAnswer, addAnswer, questionSelectedAnswer } = useChecklistStore();

  const handleClick = (newAnswer: EmotionType) => {
    if (questionSelectedAnswer(questionId) === newAnswer) {
      deleteAnswer(questionId);
    } else {
      addAnswer({ questionId: questionId, newAnswer });
    }
  };

  const emotions: Emotion[] = [
    { name: 'BAD', id: 1 },
    { name: 'SOSO', id: 2 },
    { name: 'GOOD', id: 3 },
  ];

  return (
    <Accordion>
      <Accordion.header
        id={questionId}
        hasMark={false}
        openButton={<MemoToggleButton hasMemo={false} />}
        closeButton={<ArrowDownSmall />}
      >
        <S.FlexColumn>
          <S.FlexRow>
            <QuestionDot />
            {question?.title}
          </S.FlexRow>
          {question?.subtitle && <S.Subtitle>{question?.subtitle}</S.Subtitle>}
          <S.Options>
            {emotions.map(emotion => {
              const { name: emotionName, id } = emotion;
              return (
                <FaceMark onClick={() => handleClick(emotionName)} key={id}>
                  <FaceMark.FaceIcon
                    emotion={emotionName}
                    isFilled={questionSelectedAnswer(questionId) === emotionName}
                  />
                  <FaceMark.Footer>{emotionPhrase[emotionName]}</FaceMark.Footer>
                </FaceMark>
              );
            })}
          </S.Options>
        </S.FlexColumn>
      </Accordion.header>
      <Accordion.body id={1}>aa</Accordion.body>
    </Accordion>
  );
};

export default ChecklistQuestion;

const S = {
  Container: styled.div`
    display: flex;
    padding: 16px;
  `,
  FlexColumn: styled.div`
    display: flex;
    flex-direction: column;
  `,
  FlexRow: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  FlexBetween: styled.div`
    display: flex;

    justify-content: space-between;
  `,
  Title: styled.div`
    display: flex;
    margin: 5px 0;
    flex-direction: column;

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
