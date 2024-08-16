/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from '@emotion/styled';

import { useTabContext } from '@/components/_common/Tabs/TabContext';
import AnswerIcon from '@/components/Answer/AnswerIcon';
import { ANSWER_OPTIONS } from '@/constants/answer';
import useChecklistAnswer from '@/hooks/useChecklistAnswer';
import { flexCenter, flexRow, flexSpaceBetween } from '@/styles/common';
import { AnswerType } from '@/types/answer';
import { ChecklistQuestion } from '@/types/checklist';

interface Props {
  question: ChecklistQuestion;
}

const ChecklistQuestion = ({ question }: Props) => {
  const { questionId, title, subtitle } = question;

  const { updateAndToggleAnswer: updateAnswer, findCategoryQuestion } = useChecklistAnswer();
  const { currentTabId } = useTabContext();

  const { answer } = findCategoryQuestion({ categoryId: currentTabId, questionId });

  const handleClick = (newAnswer: AnswerType) => {
    updateAnswer({ categoryId: currentTabId, questionId: questionId, newAnswer });
  };

  return (
    <S.Container>
      <S.Question>
        <S.Title>{title}</S.Title>
        {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
      </S.Question>
      <S.Options>
        {ANSWER_OPTIONS.map(option => (
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
    padding: 16px;
    gap: 5px;

    box-sizing: border-box;

    background-color: ${({ theme }) => theme.palette.white};
    border-radius: 8px;
  `,
  Question: styled.div`
    width: 80%;
  `,
  Title: styled.div`
    display: flex;
    width: 100%;
    margin: 5px 0;

    font-size: ${({ theme }) => theme.text.size.medium};
    line-height: 1.5;
    gap: 10px;
    align-items: baseline;
  `,
  Subtitle: styled.div`
    width: 100%;

    color: ${({ theme }) => theme.palette.grey500};
    font-size: ${({ theme }) => theme.text.size.small};
    line-height: 1.5;
    word-break: keep-all;
  `,
  Options: styled.div`
    width: 80px;

    ${flexRow}
    gap: 15px;

    ${flexSpaceBetween}
    align-items: center;
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
