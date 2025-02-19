import styled from '@emotion/styled';
import { useEffect } from 'react';

import CounterBox from '@/components/_common/CounterBox/CounterBox';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import QuestionCardList from '@/components/ChecklistQuestionSelect/QuestionCardList/QuestionCardList';
import SKQuestionSelectList from '@/components/skeleton/QuestionSelect/SKQuestionSelectList';
import useGetAllChecklistQuestionQuery from '@/hooks/query/useGetAllChecklistQuestionsQuery';
import useChecklistQuestionSelectStore from '@/store/useChecklistQuestionSelectStore';

const QuestionListTemplate = () => {
  const { data: checklistQuestions, isLoading } = useGetAllChecklistQuestionQuery();
  const { checklistAllQuestionList, selectedQuestions, setChecklistAllQuestionList, getCategoryQuestions } =
    useChecklistQuestionSelectStore();
  const { currentTabId } = useTabContext();

  const currentCategoryQnA = getCategoryQuestions(currentTabId);
  const allQuestionCount = checklistAllQuestionList.flatMap(category => category.questions);

  useEffect(() => {
    setChecklistAllQuestionList(checklistQuestions || []);
  }, [checklistQuestions]);

  if (isLoading) return <SKQuestionSelectList />;

  return (
    <S.Container>
      <S.CounterBox>
        <S.Span>선택 개수 :</S.Span>
        <CounterBox currentCount={selectedQuestions.length} totalCount={allQuestionCount.length} />
      </S.CounterBox>
      <QuestionCardList
        key={`${currentTabId}-customList`}
        currentTabId={currentTabId}
        questions={currentCategoryQnA?.questions}
      />
    </S.Container>
  );
};

const S = {
  Container: styled.article`
    width: 100%;
    margin-top: 1rem;
    border-radius: 0.8rem;

    background-color: white;
  `,
  Span: styled.div`
    color: ${({ theme }) => theme.palette.grey500};
  `,
  CounterBox: styled.section`
    display: flex;
    padding: 1.2rem;
    justify-content: right;
    gap: 1rem;
    align-items: center;
    border-bottom: 0.1rem solid ${({ theme }) => theme.palette.grey200};
  `,
};

export default QuestionListTemplate;
