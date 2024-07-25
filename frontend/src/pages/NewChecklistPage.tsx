import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';

import { getChecklistQuestions } from '@/apis/checklist';
import Accordion from '@/components/common/Accordion/Accordion';
import Header from '@/components/common/Header/Header';
import BasicTabs from '@/components/common/Tabs/BasicTabs';
import ChecklistCategory from '@/components/NewChecklist/ChecklistCategory';
import { flexCenter, flexColumn, title2 } from '@/styles/common';
import { ChecklistCategoryQuestions } from '@/types/checklist';

export interface Answer {
  questionId: number;
  answer: number;
}

export interface addAnswerProps {
  questionId: number;
  newAnswer: number;
}

const NewChecklistPage = () => {
  const [checklistQuestions, setChecklistQuestions] = useState<ChecklistCategoryQuestions[]>([]);

  useEffect(() => {
    const fetchChecklist = async () => {
      const checklist = await getChecklistQuestions();
      setChecklistQuestions(checklist);
    };
    fetchChecklist();
  }, []);

  const [answers, setAnswers] = useState<Answer[]>([]);

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
    <>
      <Header left={<Header.Backward />} center={<S.Title>{'새 체크리스트'}</S.Title>} />
      <BasicTabs />
      <Accordion>
        {checklistQuestions?.map(category => (
          <S.Container key={category.categoryId}>
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
          </S.Container>
        ))}
      </Accordion>
    </>
  );
};

export default NewChecklistPage;

const Container = styled.div`
  ${flexColumn}
`;

const Title = styled.div`
  ${title2}
  ${flexCenter}
`;

const S = {
  Container,
  Title,
};
