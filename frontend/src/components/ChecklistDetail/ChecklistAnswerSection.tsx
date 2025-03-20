import { Fragment } from 'react';

import Accordion from '@/components/_common/Accordion/Accordion';
import Divider from '@/components/_common/Divider/Divider';
import ChecklistAnswer from '@/components/ChecklistDetail/CheckListAnswer';
import { CATEGORY_COUNT } from '@/constants/category';
import { ChecklistCategoryWithAnswer } from '@/types/checklist';

interface Props {
  categories: ChecklistCategoryWithAnswer[];
}

const ChecklistAnswerSection = ({ categories }: Props) => {
  return (
    <Accordion totalCount={CATEGORY_COUNT}>
      {categories?.map(category => {
        if (category.questions.length <= 0) return;

        return (
          <div key={`accordion-${category.categoryId}`}>
            <Accordion.header text={category.categoryName} id={category.categoryId} isMarked={true} />
            <Accordion.body id={category.categoryId}>
              {category.questions.map((question, index) => (
                <Fragment key={question.questionId}>
                  <ChecklistAnswer QuestionAndAnswer={question} />
                  {index !== category.questions.length - 1 && <Divider />}
                </Fragment>
              ))}
            </Accordion.body>
          </div>
        );
      })}
    </Accordion>
  );
};

export default ChecklistAnswerSection;
