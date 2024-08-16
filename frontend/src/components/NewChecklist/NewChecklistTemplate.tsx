import styled from '@emotion/styled';

import Layout from '@/components/_common/layout/Layout';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import ChecklistQuestion from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestion';
import useChecklistStore from '@/store/useChecklistStore';
import theme from '@/styles/theme';

const NewChecklistTemplate = () => {
  const { currentTabId } = useTabContext();
  const { getCategoryQnA } = useChecklistStore();

  const questions = getCategoryQnA(currentTabId);
  return (
    <Layout bgColor={theme.palette.background} style={{ minHeight: `calc(100vh - 64px)` }}>
      <S.ContentBox>
        {questions!.questions.map((question: ChecklistQuestion) => (
          <ChecklistQuestion key={`${currentTabId}-${question.questionId}`} question={question} />
        ))}
      </S.ContentBox>
    </Layout>
  );
};

export default NewChecklistTemplate;

const ContentBox = styled.div`
  display: flex;
  margin-bottom: 40px;
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
