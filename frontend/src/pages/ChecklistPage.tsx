import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';

import mockQuestions from '@/_mock/checklist.json';
import { getChecklistQuestions, postChecklist } from '@/apis/checklist';
import ChecklistCategory from '@/components/checklist/ChecklistCategory';
import Header from '@/components/Header';

interface AccordianOpen {
  categoryId: number;
  isOpen: boolean;
}

export interface Answer {
  questionId: number;
  answer: number;
}

export interface addAnswerProps {
  questionId: number;
  newAnswer: number;
}

const ChecklistPage = () => {
  const [checklistQuestions, setChecklistQuestions] = useState(mockQuestions);

  useEffect(() => {
    const fetchChecklist = async () => {
      const checklist = await getChecklistQuestions();
      setChecklistQuestions(checklist);
    };
    fetchChecklist();
  }, []);

  const categories: ChecklistCategory[] = checklistQuestions;

  const [answers, setAnswers] = useState<Answer[]>([]);

  const [accordianOpen, setAccordianOpen] = useState<AccordianOpen[]>(
    categories.map(category => ({
      categoryId: category.categoryId,
      isOpen: true,
    })),
  );

  const onToggleCategoryOpen = (id: number) => {
    const newAccordianOpen = accordianOpen.map(category => {
      return category.categoryId === id ? { ...category, isOpen: !category.isOpen } : category;
    });

    setAccordianOpen(newAccordianOpen);
  };

  const isAccordianOpen = (id: number) => {
    const target = accordianOpen.filter(category => category.categoryId === id);
    return target[0].isOpen;
  };

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

  const submitAnswer = async () => await postChecklist(answers);

  return (
    <>
      <Header Button={<S.TextButton onClick={submitAnswer}>저장</S.TextButton>} />
      {mockQuestions.map(category => (
        <ChecklistCategory
          key={category.categoryId}
          category={category}
          toggleOpen={() => {
            onToggleCategoryOpen(category.categoryId);
          }}
          isAccordianOpen={isAccordianOpen(category.categoryId)}
          addAnswer={addAnswer}
          deleteAnswer={deleteAnswer}
        />
      ))}
    </>
  );
};

const S = {
  TextButton: styled.button`
    color: ${({ theme }) => theme.palette.white};
    background-color: ${({ theme }) => theme.palette.green500};
    border-radius: 5px;
    font-size: ${({ theme }) => theme.text.size.medium};
    font-weight: ${({ theme }) => theme.text.weight.bold};
    width: 60px;
    height: 40px;
  `,
};

export default ChecklistPage;
