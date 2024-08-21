import styled from '@emotion/styled';

import CounterBox from '@/components/_common/CounterBox/CounterBox';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import QuestionCardList from '@/components/ChecklistCustom/QuestionCardList/QuestionCardList';
import useChecklistCustomStore from '@/store/useChecklistCustomStore';

const QuestionListTemplate = () => {
  const { categoryQnA } = useChecklistCustomStore();
  const { currentTabId } = useTabContext();

  const currentCategoryQnA = categoryQnA(currentTabId);

  return (
    <S.Container>
      <S.CounterBox>
        <S.Span>선택 개수 :</S.Span>
        <CounterBox currentCount={12} totalCount={13} />
      </S.CounterBox>
      <QuestionCardList
        key={`${currentTabId}-customlist`}
        currentTabId={currentTabId}
        questions={currentCategoryQnA?.questions}
      />
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    width: 100%;
    margin-top: 1rem;
    border-radius: 0.8rem;

    background-color: white;
  `,
  Span: styled.div`
    color: ${({ theme }) => theme.palette.grey500};
  `,
  CounterBox: styled.div`
    display: flex;
    padding: 1.2rem;
    justify-content: right;
    gap: 1rem;
    align-items: center;
    border-bottom: 0.1rem solid ${({ theme }) => theme.palette.grey200};
  `,
};

export default QuestionListTemplate;
