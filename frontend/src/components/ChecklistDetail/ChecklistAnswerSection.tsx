import CategoryAccordion from '@/components/ChecklistDetail/CategoryAccordion';
import Accordion from '@/components/common/Accordion/Accordion';
import { ChecklistCategoryQnA } from '@/types/checklist';

interface Props {
  categories: ChecklistCategoryQnA[];
}

const ChecklistAnswerSection = ({ categories }: Props) => {
  return (
    <Accordion>
      {categories?.map(category => (
        <div key={category.categoryId}>
          <Accordion.header text={category.categoryName} id={category.categoryId} />
          <Accordion.body id={category.categoryId}>
            <CategoryAccordion key={category.categoryId} category={category} />
          </Accordion.body>
        </div>
      ))}
    </Accordion>
  );
};

export default ChecklistAnswerSection;
