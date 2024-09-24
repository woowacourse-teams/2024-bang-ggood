import styled from '@emotion/styled';

import Layout from '@/components/_common/layout/Layout';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import ChecklistQuestionItem from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestion';
import useChecklistStore from '@/store/useChecklistStore';
import { flexColumn } from '@/styles/common';
import theme from '@/styles/theme';
import { ChecklistQuestion } from '@/types/checklist';

const NewChecklistTemplate = () => {
  const { currentTabId } = useTabContext();
  const checklistActions = useChecklistStore(store => store.actions);

  const questions = checklistActions.getCategory(currentTabId);

  return (
    <Layout bgColor={theme.palette.background} withHeader withTab>
      <S.ContentBox>
        {questions?.questions.map((question: ChecklistQuestion) => (
          <ChecklistQuestionItem key={`${currentTabId}-${question.questionId}`} question={question} />
        ))}
      </S.ContentBox>
    </Layout>
  );
};

export default NewChecklistTemplate;

const S = {
  ContentBox: styled.div`
    ${flexColumn}
    margin-bottom: 2rem;

    background-color: ${({ theme }) => theme.palette.background};
    gap: 1rem;
  `,
  QuestionBox: styled.div`
    background-color: ${({ theme }) => theme.palette.white};
    border-radius: 0.8rem;
  `,
};
