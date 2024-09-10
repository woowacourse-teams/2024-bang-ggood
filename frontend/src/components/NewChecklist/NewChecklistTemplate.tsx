import styled from '@emotion/styled';

import Layout from '@/components/_common/layout/Layout';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import ChecklistQuestion from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestion';
import useChecklistTemplate from '@/hooks/useInitialChecklist';
import useChecklistStore from '@/store/useChecklistStore';
import { flexColumn } from '@/styles/common';
import theme from '@/styles/theme';

const NewChecklistTemplate = () => {
  const { currentTabId } = useTabContext();
  const { getCategoryQnA } = useChecklistStore();

  useChecklistTemplate(); // 체크리스트 질문 가져오기 및 준비

  const questions = getCategoryQnA(currentTabId);

  return (
    <Layout bgColor={theme.palette.background} withHeader withTab>
      <S.ContentBox>
        {questions?.questions.map((question: ChecklistQuestion) => (
          <ChecklistQuestion key={`${currentTabId}-${question.questionId}`} question={question} />
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
