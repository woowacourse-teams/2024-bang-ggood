import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';

import { getChecklistQuestions } from '@/apis/checklist';
import Accordion from '@/components/Accordion/Accordion';
import ChecklistCategory from '@/components/Checklist/ChecklistCategory';
import Tabs from '@/components/Tabs/Tabs';
import { flexColumn } from '@/styles/common';
import { ChecklistCategoryQuestions } from '@/types/checklist';

export interface Answer {
  questionId: number;
  answer: number;
}

export interface addAnswerProps {
  questionId: number;
  newAnswer: number;
}

const ChecklistPage = () => {
  const [checklistQuestions, setChecklistQuestions] = useState<ChecklistCategoryQuestions[]>([]);

  const menuList = [
    {
      name: '기본 정보',
      path: 'basic-info',
    },
    {
      name: '체크리스트',
      path: 'checklist',
    },
    {
      name: '메모 및 사진',
      path: 'extra-info',
    },
  ];

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
      <Tabs menuList={menuList} />
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

export default ChecklistPage;

const Container = styled.div`
  ${flexColumn}
`;

const S = {
  Container,
};
