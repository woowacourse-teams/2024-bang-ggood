import styled from '@emotion/styled';

import Layout from '@/components/common/layout/Layout';
import { useTabContext } from '@/components/common/Tabs/TabContext';
import ChecklistQuestion from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestion';
import theme from '@/styles/theme';
import { ChecklistCategoryQnA, ChecklistQuestionWithAnswer } from '@/types/checklist';

const NewChecklistTemplate = ({ questions }: { questions: ChecklistCategoryQnA }) => {
  const { currentTabId } = useTabContext();
  return (
    <Layout bgColor={theme.palette.background} style={{ minHeight: `calc(100vh - 100px)` }}>
      <S.ContentBox>
        {questions.questions.map((question: ChecklistQuestionWithAnswer) => (
          <ChecklistQuestion question={question} key={`${currentTabId}-${question.questionId}`} />
        ))}
      </S.ContentBox>
    </Layout>
  );
};

export default NewChecklistTemplate;

const ContentBox = styled.div`
  display: flex;
  padding-top: 40px;

  background-color: ${({ theme }) => theme.palette.background};
  gap: 10px;
  flex-direction: column;
`;

const QuestionBox = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 8px;
`;

const S = {
  ContentBox,
  QuestionBox,
};
