import styled from '@emotion/styled';

import Divider from '@/components/_common/Divider/Divider';
import Layout from '@/components/_common/layout/Layout';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import ChecklistQuestionItem from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestion';
import ChecklistQuestionAnswers from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestionAnswers';
import MoveNextButton from '@/components/NewChecklist/MoveNextButton';
import useInitialChecklist from '@/hooks/useInitialChecklist';
import useChecklistStore from '@/store/useChecklistStore';
import { flexCenter, flexColumn, flexRow, flexSpaceBetween } from '@/styles/common';
import theme from '@/styles/theme';
import { ChecklistQuestion } from '@/types/checklist';

const ChecklistQuestionTemplate = () => {
  useInitialChecklist(); // 체크리스트 질문 가져오기 + 형태 변환
  useChecklistStore(store => store.checklistCategoryQnA);
  const { currentTabId } = useTabContext();
  const checklistActions = useChecklistStore(store => store.actions);
  const categories = useChecklistStore(store => store.categories);
  const questions = checklistActions.getCategory(currentTabId);

  return (
    <Layout bgColor={theme.palette.background} withHeader withTab>
      <S.ContentBox>
        {questions?.questions.map((question: ChecklistQuestion, index) => {
          const answer = checklistActions.getQuestionAnswer({
            categoryId: currentTabId,
            questionId: question.questionId,
          });
          const isLastQuestion = questions?.questions.length - 1 === index;
          return (
            <>
              <S.QuestionBox key={question.questionId}>
                <ChecklistQuestionItem
                  key={`${currentTabId}-${question.questionId}`}
                  question={question}
                  width={'80%'}
                />
                <ChecklistQuestionAnswers title={question.title} answer={answer} questionId={question.questionId} />
              </S.QuestionBox>

              {!isLastQuestion && <Divider />}
            </>
          );
        })}
      </S.ContentBox>
      <MoveNextButton marginTop="2rem" marginBottom="4rem" tabCount={categories.length} />
    </Layout>
  );
};

export default ChecklistQuestionTemplate;

const S = {
  ContentBox: styled.div`
    ${flexColumn}
    ${flexCenter}
    border-radius: 0.8rem;

    background-color: ${({ theme }) => theme.palette.white};
    gap: 0.2rem;
  `,
  QuestionBox: styled.div`
    position: relative;
    width: 100%;
    ${flexRow}
    ${flexSpaceBetween}
    padding: 1.6rem;
    border-radius: 0.8rem;

    box-sizing: border-box;

    background-color: ${({ theme }) => theme.palette.white};
  `,
};
