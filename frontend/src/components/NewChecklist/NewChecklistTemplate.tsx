import styled from '@emotion/styled';

import Layout from '@/components/_common/layout/Layout';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import ChecklistQuestion from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestion';
import useChecklistStore from '@/store/useChecklistStore';
import { flexColumn } from '@/styles/common';
import theme from '@/styles/theme';

const NewChecklistTemplate = () => {
  const { currentTabId } = useTabContext();
  const { getCategoryQnA } = useChecklistStore();

  const questions = getCategoryQnA(currentTabId);
  return (
    //TODO: 나중에 탭부분 empty 박스로 적용 필요
    <Layout bgColor={theme.palette.background} style={{ minHeight: `calc(100vh - 64px)`, marginTop: '15px' }}>
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
    margin-bottom: 20px;

    background-color: ${({ theme }) => theme.palette.background};
    gap: 10px;
  `,
  QuestionBox: styled.div`
    background-color: ${({ theme }) => theme.palette.white};
    border-radius: 8px;
  `,
};
