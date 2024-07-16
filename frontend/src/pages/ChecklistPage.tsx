import { useCallback, useState } from 'react';

import mockCategories from '@/_mock/checklist.json';
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
  const questionsInfo = getChecklistQuestions();
  const categories: ChecklistCategory[] = mockCategories;

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

  return (
    <>
      <Header />
      {categories.map(category => (
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

export default ChecklistPage;
