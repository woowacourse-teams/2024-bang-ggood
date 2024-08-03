import styled from '@emotion/styled';
import { useState } from 'react';

import { ArrowUpSmall, MemoEmpty, MemoFilled, QuestionDot } from '@/assets/assets';
import FaceMark from '@/components/common/FaceMark/FaceMark';
import QuestionMemo from '@/components/NewChecklist/ChecklistQuestion/QuestionMemo';
import { EMOTION_PHARSE, EMOTIONS } from '@/constants/emotion';
import useChecklistAnswer from '@/hooks/useChecklistAnswer';
import useInput from '@/hooks/useInput';
import { flexCenter } from '@/styles/common';
import { ChecklistQuestion } from '@/types/checklist';
import { EmotionType } from '@/types/emotionAnswer';

interface Props {
  question: ChecklistQuestion;
}

const ChecklistQuestion = ({ question }: Props) => {
  const { questionId } = question;
  const { deleteAnswer, addAnswer, questionSelectedAnswer } = useChecklistAnswer();

  const [isMemoOpen, setIsMemoOpen] = useState(false);

  const { value: memoText, onChange } = useInput(null);

  const handleClick = (newAnswer: EmotionType) => {
    if (questionSelectedAnswer(questionId) === newAnswer) {
      deleteAnswer(questionId);
    } else {
      addAnswer({ questionId: questionId, newAnswer });
    }
  };

  const handleCloseMemo = () => {
    setIsMemoOpen(false);
  };

  const handleOpenMemo = () => {
    setIsMemoOpen(true);
  };

  return (
    <S.Container>
      <S.Title>
        <QuestionDot />
        {question?.title}
      </S.Title>

      {question?.subtitle && <S.Subtitle>{question?.subtitle}</S.Subtitle>}

      <S.ButtonBox>
        {isMemoOpen ? (
          <ArrowUpSmall onClick={handleCloseMemo} />
        ) : memoText?.length ? (
          <MemoFilled onClick={handleOpenMemo} />
        ) : (
          <MemoEmpty onClick={handleOpenMemo} />
        )}
      </S.ButtonBox>

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
      {isMemoOpen && <QuestionMemo text={memoText} onChange={onChange} />}
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
    width: 90%;
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
  ButtonBox: styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    ${flexCenter}

    :hover {
      background-color: ${({ theme }) => theme.palette.background};
    }
  `,
};
