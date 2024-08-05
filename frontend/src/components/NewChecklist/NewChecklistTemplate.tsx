import styled from '@emotion/styled';

import { useTabContext } from '@/components/common/Tabs/TabContext';
import ChecklistQuestion from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestion';
import { ChecklistCategoryQnA, ChecklistQuestionWithAnswer } from '@/types/checklist';

const NewChecklistTemplate = ({ questions }: { questions: ChecklistCategoryQnA }) => {
  const { currentTabId } = useTabContext();
  return (
    <S.ContentBox>
      {questions.questions.map((question: ChecklistQuestionWithAnswer) => (
        <ChecklistQuestion question={question} key={`${currentTabId}-${question.questionId}`} />
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
