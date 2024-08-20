import styled from '@emotion/styled';

import { QuestionDot } from '@/assets/assets';
import Checkbox from '@/components/_common/Checkbox/Checkbox';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import useChecklistQuestionUpdate from '@/hooks/useChecklistQuestionUpdate';
import { flexCenter } from '@/styles/common';
import { ChecklistQuestionWithIsSelected } from '@/types/checklist';

const QuestionSelectCard = ({ question }: { question: ChecklistQuestionWithIsSelected }) => {
  const { title, subtitle, isSelected, questionId } = question;
  const { updateCheckQuestion } = useChecklistQuestionUpdate();
  const { currentTabId: categoryId } = useTabContext();

  const handleCheckQuestion = () => {
    updateCheckQuestion({ questionId, isSelected: !isSelected, categoryId });
  };

  return (
    <S.Container isChecked={isSelected} onClick={handleCheckQuestion}>
      <S.FlexColumn>
        <S.FlexRow>
          <QuestionDot />
          <S.Title>{title}</S.Title>
        </S.FlexRow>
        {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
      </S.FlexColumn>
      <S.CheckBoxContainer>
        <Checkbox
          iconType="plus"
          isChecked={isSelected}
          setIsChecked={handleCheckQuestion}
          onClick={handleCheckQuestion}
        />
      </S.CheckBoxContainer>
    </S.Container>
  );
};

export default QuestionSelectCard;

const S = {
  Container: styled.div<{ isChecked: boolean }>`
    display: flex;
    width: 100%;
    min-height: 50px;
    justify-content: space-between;
    align-items: center;

    background-color: ${({ isChecked, theme }) => isChecked && theme.palette.green50};
  `,
  FlexColumn: styled.div`
    display: flex;
    width: 90%;
    padding: 10px;
    padding-left: 20px;
    flex-direction: column;
  `,
  FlexRow: styled.div`
    ${flexCenter}
    gap: 8px;
    justify-content: left;
  `,
  Title: styled.div`
    display: flex;

    font-size: ${({ theme }) => theme.text.size.medium};
    line-height: 1.5;
    gap: 10px;
  `,
  Subtitle: styled.div`
    padding-left: 20px;

    color: ${({ theme }) => theme.palette.grey500};
    font-size: ${({ theme }) => theme.text.size.small};
    line-height: 1.5;
    word-break: keep-all;
  `,
  CheckBoxContainer: styled.div`
    padding-right: 20px;
  `,
};
