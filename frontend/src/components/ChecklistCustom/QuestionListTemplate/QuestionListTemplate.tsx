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
    margin-top: 10px;
    border-radius: 8px;

    background-color: white;
  `,
  Span: styled.div`
    color: ${({ theme }) => theme.palette.grey500};
  `,
  CounterBox: styled.div`
    display: flex;
    padding: 12px;
    justify-content: right;
    gap: 10px;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey200};
  `,
};

export default QuestionListTemplate;
