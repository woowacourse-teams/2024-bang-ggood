import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';

import { getChecklistQuestions } from '@/apis/checklist';
import Accordion from '@/components/common/Accordion/Accordion';
import ChecklistCategory from '@/components/NewChecklist/ChecklistCategory';
import { ChecklistCategoryQuestions, ChecklistFormAnswer } from '@/types/checklist';

export interface addAnswerProps {
  questionId: number;
  newAnswer: number;
}

const NewChecklistTemplate = () => {
  const [checklistQuestions, setChecklistQuestions] = useState<ChecklistCategoryQuestions[]>([]);

  useEffect(() => {
    const fetchChecklist = async () => {
      const checklist = await getChecklistQuestions();
      setChecklistQuestions(checklist);
    };
    fetchChecklist();
  }, []);

  const [answers, setAnswers] = useState<ChecklistFormAnswer[]>([]);

  const addAnswer = useCallback(
    ({ questionId, newAnswer }: addAnswerProps) => {
      const target = [...answers].find(answer => answer.questionId === questionId);
      if (target) {
        const newAnswers = [...answers].map(answer =>
          answer.questionId === questionId ? { questionId, answer: newAnswer } : answer,
        );
        setAnswers(newAnswers);
        return;
      }
      setAnswers(prev => [...prev, { questionId, answer: newAnswer }]);
    },
    [answers],
  );

  const deleteAnswer = (questionId: number) => {
    setAnswers(prevAnswers => {
      return prevAnswers.filter(answer => answer.questionId !== questionId);
    });
  };

  return (
    <S.ContentBox>
      <Accordion>
        {checklistQuestions?.map(category => (
          <div key={category.categoryId}>
            <Accordion.header text={'청결도'} id={category.categoryId} />
            <Accordion.body id={category.categoryId}>
              <ChecklistCategory
                type="question"
                key={category.categoryId}
                category={category}
                addAnswer={addAnswer}
                deleteAnswer={deleteAnswer}
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
