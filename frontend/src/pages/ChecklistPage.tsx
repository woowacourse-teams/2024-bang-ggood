import { useState } from 'react';

import mockCategories from '@/_mock/checklist.json';
import ChecklistCategory from '@/components/checklist/ChecklistCategory';
import Header from '@/components/Header';

const makeAnswerSheets = (categories: ChecklistCategory[]) => categories.map(category => makeAnswer(category));
const makeAnswer = (category: ChecklistCategory) => category.questions.map(q => ({ q_id: q.questionId, answer: null }));

const ChecklistPage = () => {
  const categories: ChecklistCategory[] = mockCategories;

  const [answers, setAnswer] = useState(makeAnswerSheets(categories));

  return (
    <>
      <Header />
      {categories.map(category => (
        <ChecklistCategory key={category.categoryId} category={category} />
      ))}
    </>
  );
};

export default ChecklistPage;
