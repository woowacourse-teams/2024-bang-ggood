import styled from '@emotion/styled';

import { ArrowDownSmall, ArrowUpSmall } from '@/assets/assets';
import ChecklistAnswer from '@/components/Checklist/CheckListAnswer';
import ChecklistQuestion from '@/components/Checklist/ChecklistQuestion';
import { addAnswerProps } from '@/pages/ChecklistPage';
import { ChecklistCategoryQuestions } from '@/types/checklist';

interface Props {
  category: ChecklistCategoryQuestions;
  // eslint-disable-next-line no-unused-vars
  toggleOpen?: (id: number) => void;
  isAccordianOpen?: boolean;
  addAnswer: ({ questionId, newAnswer }: addAnswerProps) => void;
  deleteAnswer: (questionId: number) => void;
  isAnswer?: boolean;
}

const ChecklistCategory = ({
  category,
  toggleOpen,
  isAccordianOpen,
  addAnswer,
  deleteAnswer,
  isAnswer = false,
}: Props) => {
  return (
    <>
      <S.Category onClick={() => toggleOpen(category.categoryId)}>
        <span>{category.categoryName}</span>
        {isAccordianOpen ? <ArrowUpSmall /> : <ArrowDownSmall />}
      </S.Category>

      <S.Container isShow={isAccordianOpen}>
        {category.questions.map(question =>
          isAnswer ? (
            <ChecklistAnswer key={question.questionId} QandA={question} />
          ) : (
            <ChecklistQuestion
              key={question.questionId}
              question={question}
              addAnswer={addAnswer}
              deleteAnswer={deleteAnswer}
            />
          ),
        )}
      </S.Container>
    </>
  );
};

export default ChecklistCategory;

const S = {
  Category: styled.div`
    display: flex;
    padding: 16px;

    background-color: #f3f3f3;

    /* background-color: ${({ theme }) => theme.palette.yellow100}; */
    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.large};
    justify-content: space-between;
    border-bottom: ${({ theme }) => `2px solid ${theme.palette.grey200}`};
    cursor: pointer;

    /* box-shadow:; */
  `,
  Container: styled.div<{ isShow: boolean }>`
    max-height: ${({ isShow }) => (isShow ? '1000px' : '0')};
    overflow: hidden;
    transition: max-height 0.6s ease;
  `,
};
