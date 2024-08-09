/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from '@emotion/styled';

import { QuestionDot } from '@/assets/assets';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import useChecklistAnswer from '@/hooks/useChecklistAnswer';
import { flexCenter, flexSpaceBetween } from '@/styles/common';
import { AnswerType } from '@/types/answer';
import { ChecklistQuestion } from '@/types/checklist';

interface Props {
  question: ChecklistQuestion;
}

const ChecklistQuestion = ({ question }: Props) => {
  const { questionId } = question;
  const { updateAndToggleAnswer: updateAnswer, findCategoryQuestion } = useChecklistAnswer();
  const { currentTabId } = useTabContext();

  const { answer } = findCategoryQuestion({ categoryId: currentTabId, questionId });

  const handleClick = (newAnswer: AnswerType) => {
    updateAnswer({ categoryId: currentTabId, questionId: questionId, newAnswer });
  };

  return (
    <S.Container>
      <S.Title>
        <QuestionDot />
        {question?.title}
      </S.Title>
      {question?.subtitle && <S.Subtitle>{question?.subtitle}</S.Subtitle>}
      {/* <S.ButtonBox>
        {isMemoOpen ? (
          <ArrowUpSmall onClick={handleCloseMemo} />
        ) : memo?.length ? (
          <MemoFilled onClick={handleOpenMemo} />
        ) : (
          <MemoEmpty onClick={handleOpenMemo} />
        )}
      </S.ButtonBox> */}

      {/* <S.Options>
        {EMOTIONS.map(emotion => {
          const { name: emotionName, id } = emotion;

          return (
            <FaceMark onClick={() => handleClick(emotionName)} key={id}>
              <FaceMark.FaceIcon emotion={emotionName} isFilled={grade === emotionName} />
              <FaceMark.Footer>{ANSWER_PHRASE[emotionName]}</FaceMark.Footer>
            </FaceMark>
          );
        })}
      </S.Options> */}
      {/* {isMemoOpen && <QuestionMemo questionId={questionId} text={memo ?? ''} />} */}
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
    ${flexSpaceBetween}
    width: 80%;
    margin: 0 auto;
    margin-top: 10px;
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
