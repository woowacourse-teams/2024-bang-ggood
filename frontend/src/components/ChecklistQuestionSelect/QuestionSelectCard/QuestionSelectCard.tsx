import styled from '@emotion/styled';

import Checkbox from '@/components/_common/Checkbox/Checkbox';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import useChecklistQuestionSelect from '@/hooks/useChecklistQuestionSelect';
import { ChecklistQuestionWithIsSelected } from '@/types/checklist';
import { fontStyle } from '@/utils/fontStyle';

const QuestionSelectCard = ({ question }: { question: ChecklistQuestionWithIsSelected }) => {
  const { title, subtitle, isSelected, questionId } = question;
  const { toggleQuestionSelect, statusMessage } = useChecklistQuestionSelect();
  const { currentTabId: categoryId } = useTabContext();

  const handleCheckQuestion = () => {
    toggleQuestionSelect({ questionId, isSelected: !isSelected, categoryId });
  };

  return (
    <>
      <S.Container
        isChecked={isSelected}
        onClick={handleCheckQuestion}
        aria-label={`${title} ${subtitle ?? ''} 해당 질문을 선택하려면 두번 탭하세요.`}
        tabIndex={0}
        className="question"
      >
        <FlexBox.Vertical>
          <S.Title>{title}</S.Title>
          {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
        </FlexBox.Vertical>
        <Checkbox
          iconType="plus"
          isChecked={isSelected}
          onClick={handleCheckQuestion}
          aria-hidden="true"
          tabIndex={-1}
        />
      </S.Container>
      {statusMessage && (
        <div className="visually-hidden" role="alert">
          {title + statusMessage}
        </div>
      )}
    </>
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
    padding: 1.6rem;
    border-radius: 0.8rem;
    box-sizing: border-box;
    cursor: pointer;

    border: 0.15rem solid ${({ isChecked, theme }) => (isChecked ? theme.color.primary[500] : theme.color.mono.white)};

    background-color: ${({ theme }) => theme.color.mono.white};
  `,
  Title: styled.div`
    display: flex;

    gap: 1rem;
    ${({ theme }) => fontStyle(theme.font.heading[2].B)}
  `,
  Subtitle: styled.div`
    word-break: keep-all;
    ${({ theme }) => fontStyle(theme.font.body[1].R)}
  `,
};
