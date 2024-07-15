import styled from '@emotion/styled';

import { ArrowDownSmall, ArrowUpSmall } from '@/assets/assets';
import ChecklistQuestion from '@/components/checklist/ChecklistQuestion';
import { ChecklistCategory } from '@/types/checklist';

interface Props {
  category: ChecklistCategory;
  // eslint-disable-next-line no-unused-vars
  toggleOpen?: (id: number) => void;
  isAccordianOpen?: boolean;
}

const ChecklistCategory = ({ category, toggleOpen, isAccordianOpen }: Props) => {
  return (
    <>
      <S.Category onClick={() => toggleOpen(category.categoryId)}>
        <span>{category.category}</span>
        {isAccordianOpen ? <ArrowUpSmall /> : <ArrowDownSmall />}
      </S.Category>

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

    display: flex;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.palette.grey100};

    font-weight: ${({ theme }) => theme.text.weight.bold};

    font-size: ${({ theme }) => theme.text.size.large};
    border-bottom: ${({ theme }) => `1px solid ${theme.palette.grey200}`};
  `,
  Container: styled.div<{ isShow: boolean }>`
    display: ${({ isShow }) => (isShow ? 'block' : 'none')};
  `,
};
