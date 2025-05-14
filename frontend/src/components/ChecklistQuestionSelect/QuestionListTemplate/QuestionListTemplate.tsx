import styled from '@emotion/styled';
import { useEffect } from 'react';

import { TrashIcon } from '@/assets/assets';
import CounterBox from '@/components/_common/CounterBox/CounterBox';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import QuestionCardList from '@/components/ChecklistQuestionSelect/QuestionCardList/QuestionCardList';
import SKQuestionSelectList from '@/components/skeleton/QuestionSelect/SKQuestionSelectList';
import useGetAllChecklistQuestionQuery from '@/hooks/query/useGetAllChecklistQuestionsQuery';
import useChecklistQuestionSelectStore from '@/store/useChecklistQuestionSelectStore';
import { fontStyle } from '@/utils/fontStyle';

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

  const handleRemoveQuestions = () => {
    // TODO: API 붙이기
  };

  if (isLoading) return <SKQuestionSelectList />;

  return (
    <S.Container>
      <S.CounterBox>
        <S.Span>선택 개수 :</S.Span>
        <CounterBox currentCount={selectedQuestions.length} totalCount={allQuestionCount.length} />
        <S.RemoveButton onClick={handleRemoveQuestions}>
          <TrashIcon />
          삭제하기
        </S.RemoveButton>
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
    margin-top: 1.6rem;
  `,
  Span: styled.div`
    color: ${({ theme }) => theme.color.gray[500]};
  `,
  CounterBox: styled.section`
    display: flex;
    margin-bottom: 1.6rem;
    padding: 1.2rem;
    justify-content: right;
    gap: 1rem;
    align-items: center;
  `,
  RemoveButton: styled.button`
    display: flex;
    gap: 0.8rem;
    align-items: center;
    padding: 0.8rem 1.6rem;

    ${({ theme }) => fontStyle(theme.font.body[1].B)}
    background-color: ${({ theme }) => theme.color.mono.white};
    border-radius: 0.8rem;
  `,
};

export default QuestionListTemplate;
