import styled from '@emotion/styled';

import { QuestionDot } from '@/assets/assets';
import Checkbox from '@/components/common/Checkbox/Checkbox';
import { useTabContext } from '@/components/common/Tabs/TabContext';
import useChecklistQuestionUpdate from '@/hooks/useChecklistQuestionUpdate';
import useChecklistCustomStore from '@/store/useChecklistCustomStore';
import { flexCenter } from '@/styles/common';
import { ChecklistQuestionWithIsChecked } from '@/types/checklist';

const QuestionSelectCard = ({ question }: { question: ChecklistQuestionWithIsChecked }) => {
  const { title, subtitle, isChecked, questionId } = question;
  const { updateCheckQuestion } = useChecklistQuestionUpdate();
  const { currentTabId: categoryId } = useTabContext();
  const { findCategoryQuestion } = useChecklistCustomStore();

  const handleCheckQuestion = () => {
    updateCheckQuestion({ questionId, isChecked: !isChecked, categoryId });
  };

  const currentQuestion = findCategoryQuestion({ categoryId, questionId });

  return (
    <S.Container isChecked={currentQuestion.isChecked} onClick={handleCheckQuestion}>
      <S.FlexColumn>
        <S.FlexRow>
          <QuestionDot />
          <S.Title>{title}</S.Title>
        </S.FlexRow>
        {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
      </S.FlexColumn>
      <S.CheckBoxContainer>
        <Checkbox
          isChecked={currentQuestion.isChecked}
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
    padding: 10px;
    padding-left: 20px;
    flex-direction: column;
    justify-content: space-between;
  `,
  FlexRow: styled.div`
    ${flexCenter}
    gap: 8px;
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
    padding-right: 40px;
  `,
};
