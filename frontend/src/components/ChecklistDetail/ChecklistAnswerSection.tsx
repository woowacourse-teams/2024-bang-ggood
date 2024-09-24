import Accordion from '@/components/_common/Accordion/Accordion';
import CategoryAccordion from '@/components/ChecklistDetail/CategoryAccordion';
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
              <CategoryAccordion key={category.categoryId} category={category} />
            </Accordion.body>
          </div>
        );
      })}
    </Accordion>
  );
};

export default ChecklistAnswerSection;
