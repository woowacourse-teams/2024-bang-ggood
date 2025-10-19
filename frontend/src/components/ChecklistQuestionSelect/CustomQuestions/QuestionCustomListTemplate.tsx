import styled from '@emotion/styled';
import { useState } from 'react';
import { useStore } from 'zustand';

import Button from '@/components/_common/Button/Button';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import Text from '@/components/_common/Text/Text';
import AddCustomQuestionModal from '@/components/ChecklistQuestionSelect/CustomQuestions/AddCustomQuestionModal';
import QuestionCardListCustom from '@/components/ChecklistQuestionSelect/CustomQuestions/QuestionCardListCustom';
import { selectedIdsStore } from '@/components/ChecklistQuestionSelect/CustomQuestions/selectedQuestionIdsStore';
import SKQuestionSelectList from '@/components/skeleton/QuestionSelect/SKQuestionSelectList';
import useGetAllChecklistQuestionQuery from '@/hooks/query/useGetAllChecklistQuestionsQuery';
import usePostCustomQuestionMutation, {
  RequestParamPostCustomQuestion,
} from '@/hooks/query/usePostCustomQuestionMutation';

const QuestionCustomListTemplate = () => {
  const { data: checklistQuestions, isLoading } = useGetAllChecklistQuestionQuery();
  const { mutate: addCustomQuestion } = usePostCustomQuestionMutation();
  const customCategories = checklistQuestions?.userCategories;

  const { selectedIds, toggleSelectedId } = useStore(selectedIdsStore);
  const handleSelect = (id: number) => toggleSelectedId(id);

  const [isAddCustomQuestionModalOpen, setIsAddCustomQuestionModalOpen] = useState(false);
  const { currentTabId } = useTabContext();

  const currentCategoryQnA = customCategories?.filter(category => category.categoryId === currentTabId)[0];

  if (isLoading) return <SKQuestionSelectList />;

  return (
    <S.Container>
      <S.Row>
        <Text typography={font => font.headline[2].B} color={theme => theme.mono.black}>
          내가 추가한 질문
        </Text>
        <Button variant="outlined-gray" size="small" onClick={() => {}} label="삭제하기" />
      </S.Row>

      <QuestionCardListCustom
        key={`${currentTabId}-customList`}
        currentTabId={currentTabId}
        questions={currentCategoryQnA?.questions ?? []}
        onSelect={handleSelect}
        selectedIds={selectedIds}
      />
      <Button
        variant="outlined-gray"
        size="full"
        onClick={() => setIsAddCustomQuestionModalOpen(true)}
        label="질문추가"
      />
      <AddCustomQuestionModal
        isOpen={isAddCustomQuestionModalOpen}
        onClose={() => {
          setIsAddCustomQuestionModalOpen(false);
        }}
        onConfirm={(question: RequestParamPostCustomQuestion) => {
          addCustomQuestion(question);
        }}
      />
    </S.Container>
  );
};

const S = {
  Container: styled.article`
    width: 100%;
    margin: 1.6rem -1.6rem 0;
    padding: 1.6rem;
    background: white;
  `,
  Row: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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
};

export default QuestionCustomListTemplate;
