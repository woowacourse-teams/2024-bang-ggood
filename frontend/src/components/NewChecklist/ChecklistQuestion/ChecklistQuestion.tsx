import styled from '@emotion/styled';

import HighlightText from '@/components/_common/Highlight/HighlightText';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import AnswerIcon from '@/components/Answer/AnswerIcon';
import { ANSWER_OPTIONS } from '@/constants/answer';
import useChecklistAnswer from '@/hooks/useChecklistAnswer';
import { flexCenter, flexRow, flexSpaceBetween } from '@/styles/common';
import { Answer, AnswerType } from '@/types/answer';
import { ChecklistQuestion } from '@/types/checklist';

interface Props {
  question: ChecklistQuestion;
}

const ChecklistQuestion = ({ question }: Props) => {
  const { questionId, title, highlights } = question;

  const { updateAndToggleAnswer: updateAnswer, findCategoryQuestion } = useChecklistAnswer();
  const { currentTabId } = useTabContext();

  const { answer } = findCategoryQuestion({ categoryId: currentTabId, questionId });

  const handleClick = (newAnswer: AnswerType) => {
    updateAnswer({ categoryId: currentTabId, questionId: questionId, newAnswer });
  };

  return (
    <S.Container>
      <S.Question>
        <HighlightText title={title} highlights={highlights} />
      </S.Question>
      <S.Options>
        {ANSWER_OPTIONS.map((option: Answer) => (
          <div key={option.id} onClick={() => handleClick(option.name)}>
            <AnswerIcon answer={option.name} isSelected={answer === option.name} />
          </div>
        ))}
      </S.Options>
    </S.Container>
  );
};

export default ChecklistQuestion;

const S = {
  Container: styled.div`
    position: relative;
    width: 100%;
    ${flexRow}
    ${flexSpaceBetween}
    padding: 1.6rem;
    gap: 0.5rem;

    box-sizing: border-box;

    background-color: ${({ theme }) => theme.palette.white};
    border-radius: 0.8rem;
  `,
  Question: styled.div`
    width: 80%;
  `,
  Subtitle: styled.div`
    width: 100%;

    color: ${({ theme }) => theme.palette.grey500};
    font-size: ${({ theme }) => theme.text.size.small};
    word-break: keep-all;
  `,
  Options: styled.div`
    width: 8rem;

    ${flexRow}
    gap: 1.5rem;

    ${flexSpaceBetween}
    align-items: center;
  `,
  ButtonBox: styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    ${flexCenter}

    :hover {
      background-color: ${({ theme }) => theme.palette.background};
    }
  `,
};
