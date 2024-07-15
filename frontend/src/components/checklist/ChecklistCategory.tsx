import styled from '@emotion/styled';

import ChecklistQuestion from '@/components/checklist/ChecklistQuestion';
import { ChecklistCategory } from '@/types/checklist';

interface Props {
  category: ChecklistCategory;
}

const ChecklistCategory = ({ category }: Props) => {
  return (
    <>
      <S.Category>{category.category}</S.Category>
      {category.questions.map(question => (
        <ChecklistQuestion key={question.questionId} question={question} />
      ))}
    </>
  );
};

export default ChecklistCategory;

const S = {
  Category: styled.div`
    padding: 16px;

    background-color: ${({ theme }) => theme.palette.grey100};

    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.medium};
  `,
};
