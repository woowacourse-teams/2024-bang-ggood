import styled from '@emotion/styled';

import Checkbox from '@/components/_common/Checkbox/Checkbox';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import useChecklistQuestionSelect from '@/hooks/useChecklistQuestionSelect';
import { flexCenter } from '@/styles/common';
import { ChecklistQuestionWithIsSelected } from '@/types/checklist';

const QuestionSelectCard = ({ question }: { question: ChecklistQuestionWithIsSelected }) => {
  const { title, subtitle, isSelected, questionId } = question;
  const { toggleQuestionSelect } = useChecklistQuestionSelect();
  const { currentTabId: categoryId } = useTabContext();

  const handleCheckQuestion = () => {
    toggleQuestionSelect({ questionId, isSelected: !isSelected, categoryId });
  };

  return (
    <S.Container isChecked={isSelected} onClick={handleCheckQuestion} className="question">
      <S.FlexColumn>
        <FlexBox.Vertical>
          <S.Title>{title}</S.Title>
          {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
        </FlexBox.Vertical>
      </S.FlexColumn>
      <S.CheckBoxContainer>
        <Checkbox iconType="plus" isChecked={isSelected} onClick={handleCheckQuestion} />
      </S.CheckBoxContainer>
    </S.Container>
  );
};

export default QuestionSelectCard;

const S = {
  Container: styled.div<{ isChecked: boolean }>`
    display: flex;
    width: 100%;
    min-height: 5rem;
    justify-content: space-between;
    align-items: center;

    background-color: ${({ isChecked, theme }) => isChecked && theme.palette.green50};
  `,
  FlexColumn: styled.div`
    display: flex;
    width: 90%;
    padding: 1rem;
    padding-left: 2rem;
    flex-direction: column;
  `,
  FlexRow: styled.div`
    ${flexCenter}
    gap: .8rem;
    justify-content: left;
  `,
  Title: styled.div`
    display: flex;

    font-size: ${({ theme }) => theme.text.size.medium};
    gap: 1rem;
  `,
  Subtitle: styled.div`
    color: ${({ theme }) => theme.palette.grey500};
    font-size: ${({ theme }) => theme.text.size.small};
    word-break: keep-all;
  `,
  CheckBoxContainer: styled.div`
    padding-right: 2rem;
  `,
};
