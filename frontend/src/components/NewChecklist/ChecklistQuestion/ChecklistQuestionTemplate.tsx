import styled from '@emotion/styled';

import Layout from '@/components/_common/layout/Layout';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import ChecklistQuestionItem from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestion';
import useInitialChecklist from '@/hooks/useInitialChecklist';
import useChecklistStore from '@/store/useChecklistStore';
import { flexColumn } from '@/styles/common';
import theme from '@/styles/theme';
import { ChecklistQuestion } from '@/types/checklist';

const ChecklistQuestionTemplate = () => {
  console.log('A');
  useInitialChecklist(); // 체크리스트 질문 가져오기 + 형태 변환
  useChecklistStore(store => store.checklistCategoryQnA);

  console.log('B');

  const { currentTabId } = useTabContext();
  const checklistActions = useChecklistStore(store => store.actions);
  const questions = checklistActions.getCategory(currentTabId);

  console.log('C');

  return (
    <Layout bgColor={theme.palette.background} withHeader withTab>
      <S.ContentBox>
        {questions?.questions.map((question: ChecklistQuestion) => {
          const answer = checklistActions.getQuestionAnswer({
            categoryId: currentTabId,
            questionId: question.questionId,
          });
          return (
            <ChecklistQuestionItem key={`${currentTabId}-${question.questionId}`} question={question} answer={answer} />
          );
        })}
      </S.ContentBox>
    </Layout>
  );
};

export default ChecklistQuestionTemplate;

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
