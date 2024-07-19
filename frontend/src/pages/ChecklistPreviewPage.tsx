import { useEffect, useState } from 'react';

import mockCategories from '@/_mock/checklist.json';
import Accordion from '@/components/accordion/Accordion';
import ChecklistCategory from '@/components/checklist/ChecklistCategory';
import HeaderWithLogo from '@/components/HeaderWithLogo';
import { ChecklistCategoryQuestions } from '@/types/checklist';

export interface addAnswerProps {
  questionId: number;
  newAnswer: number;
}

const ChecklistPreviewPage = () => {
  const [checklistQuestions, setChecklistQuestions] = useState<ChecklistCategoryQuestions[]>([]);

  useEffect(() => {
    const fetchChecklist = () => {
      const checklist = mockCategories;
      // const checklist = await getChecklistQuestions();
      setChecklistQuestions(checklist);
    };
    fetchChecklist();
  }, []);

  return (
    <>
      <HeaderWithLogo />
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
