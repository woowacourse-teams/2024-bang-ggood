import styled from '@emotion/styled';

import { useTabContext } from '@/components/common/Tabs/TabContext';
import ChecklistQuestion from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestion';
import useChecklistStore from '@/store/useChecklistStore';
import { ChecklistCategoryQnA, ChecklistQuestionWithAnswer } from '@/types/checklist';

const NewChecklistTemplate = () => {
  const { currentTabId } = useTabContext();

  const { checklistCategoryQnA } = useChecklistStore();

  const targetCategoryQuestions = checklistCategoryQnA.filter(
    (categoryQnA: ChecklistCategoryQnA) => categoryQnA.categoryId === currentTabId,
  )[0];

  return (
    <S.ContentBox>
      {targetCategoryQuestions.questions.map((question: ChecklistQuestionWithAnswer) => (
        <ChecklistQuestion question={question} key={question.subtitle} />
      ))}
    </S.ContentBox>
  );
};

export default NewChecklistTemplate;

const ContentBox = styled.div`
  display: flex;
  padding: 0 16px;
  padding-top: 60px;
  padding-bottom: 16px;

  background-color: ${({ theme }) => theme.palette.background};
  gap: 10px;
  flex-direction: column;
  min-height: calc(100vh - 70px);
`;

const QuestionBox = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 8px;
`;

const S = {
  ContentBox,
  QuestionBox,
};
