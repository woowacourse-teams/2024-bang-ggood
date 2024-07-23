import { useEffect, useState } from 'react';

import { getChecklistQuestions } from '@/apis/checklist';
import Accordion from '@/components/common/Accordion/Accordion';
import Header from '@/components/common/Header/Header';
import ChecklistCategory from '@/components/NewChecklist/ChecklistCategory';
import { ChecklistCategoryQuestions } from '@/types/checklist';

export interface addAnswerProps {
  questionId: number;
  newAnswer: number;
}

const ChecklistPreviewPage = () => {
  const [checklistQuestions, setChecklistQuestions] = useState<ChecklistCategoryQuestions[]>([]);

  useEffect(() => {
    const fetchChecklist = async () => {
      const checklist = await getChecklistQuestions();
      setChecklistQuestions(checklist);
    };
    fetchChecklist();
  }, []);

  return (
    <>
      <Header left={<Header.Backward />} />
      <Accordion>
        {checklistQuestions?.map(category => (
          <>
            <Accordion.header text={'청결도'} id={category.categoryId} />
            <Accordion.body id={category.categoryId}>
              <ChecklistCategory type="preview" key={category.categoryId} category={category} />
            </Accordion.body>
          </>
        ))}
      </Accordion>
    </>
  );
};

export default ChecklistPreviewPage;
