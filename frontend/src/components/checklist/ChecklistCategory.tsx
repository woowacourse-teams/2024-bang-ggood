import styled from '@emotion/styled';

import ChecklistQuestion from '@/components/checklist/ChecklistQuestion';
import { ChecklistCategory } from '@/types/checklist';

interface Props {
  category: ChecklistCategory;
  toggleOpen?: (id: number) => void;
  isAccordianOpen?: boolean;
}

const ChecklistCategory = ({ category, toggleOpen, isAccordianOpen }: Props) => {
  return (
    <>
      <S.Category onClick={() => toggleOpen(category.categoryId)}>{category.category}</S.Category>

      <S.Container isShow={isAccordianOpen}>
        {category.questions.map(question => (
          <ChecklistQuestion key={question.questionId} question={question} />
        ))}
      </S.Container>
    </>
  );
};

export default ChecklistCategory;

const S = {
  Category: styled.div<{ onClick: () => void }>`
    padding: 16px;

    background-color: ${({ theme }) => theme.palette.grey100};

    font-weight: ${({ theme }) => theme.text.weight.bold};
    font-size: ${({ theme }) => theme.text.size.medium};
  `,
  Container: styled.div<{ isShow: boolean }>`
    display: ${({ isShow }) => (isShow ? 'block' : 'none')};
  `,
};
