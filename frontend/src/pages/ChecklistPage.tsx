import { useCallback, useEffect, useState } from 'react';

import mockCategories from '@/_mock/checklist.json';
import ChecklistCategory from '@/components/Checklist/ChecklistCategory';
import Accordion from '@/components/common/Accordion/Accordion';
import Tabs from '@/components/common/Tabs/Tabs';
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
    const fetchChecklist = () => {
      const checklist = mockCategories;
      // const checklist = await getChecklistQuestions();
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
          <>
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
          </>
        ))}
      </Accordion>
    </>
  );
};

export default ChecklistPage;
