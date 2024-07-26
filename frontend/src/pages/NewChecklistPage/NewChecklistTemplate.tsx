import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { getChecklistQuestions } from '@/apis/checklist';
import Accordion from '@/components/common/Accordion/Accordion';
import ChecklistCategory from '@/components/NewChecklist/ChecklistCategory';
import { ChecklistCategoryQuestions, ChecklistFormAnswer } from '@/types/checklist';

export interface addAnswerProps {
  questionId: number;
  newAnswer: number;
}

interface Props {
  addAnswer: ({ questionId, newAnswer }: addAnswerProps) => void;
  deleteAnswer: (questionId: number) => void;
  answers: ChecklistFormAnswer[];
  setAnswers: React.Dispatch<React.SetStateAction<ChecklistFormAnswer[]>>;
  questionSelectedAnswer: (questionId: number) => number | undefined;
}

const NewChecklistTemplate = (props: Props) => {
  const { questionSelectedAnswer, addAnswer, deleteAnswer } = props;

  const [checklistQuestions, setChecklistQuestions] = useState<ChecklistCategoryQuestions[]>([]);

  useEffect(() => {
    const fetchChecklist = async () => {
      const checklist = await getChecklistQuestions();
      setChecklistQuestions(checklist);
    };
    fetchChecklist();
  }, []);

  return (
    <S.ContentBox>
      <Accordion>
        {checklistQuestions?.map((category, categoryIndex) => (
          <div key={`category-${category.categoryId}`}>
            <Accordion.header
              text={category.categoryName}
              id={category.categoryId}
              key={`header-${category.categoryId}`}
            />
            <Accordion.body id={category.categoryId} key={`body-${category.categoryId}`}>
              <ChecklistCategory
                type="question"
                key={`category-${category.categoryId}-${categoryIndex}`}
                category={category}
                addAnswer={addAnswer}
                deleteAnswer={deleteAnswer}
                questionSelectedAnswer={questionSelectedAnswer}
              />
            </Accordion.body>
          </div>
        ))}
      </Accordion>
    </S.ContentBox>
  );
};

export default NewChecklistTemplate;

const ContentBox = styled.div`
  padding: 16px;
  min-height: 100vh;

  background-color: ${({ theme }) => theme.palette.backgroud};
`;
const S = {
  ContentBox,
};
