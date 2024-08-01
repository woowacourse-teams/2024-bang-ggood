import Accordion from '@/components/common/Accordion/Accordion';
import ChecklistCategory from '@/components/NewChecklist/ChecklistCategory';
import { ChecklistCategoryQuestions } from '@/types/checklist';

interface Props {
  categories: ChecklistCategoryQuestions[];
}

const ChecklistAnswerSection = ({ categories }: Props) => {
  return (
    <Accordion>
      {categories?.map(category => (
        <div key={category.categoryId}>
          <Accordion.header text={category.categoryName} id={category.categoryId} />
          <Accordion.body id={category.categoryId}>
            <ChecklistCategory type="answered" key={category.categoryId} category={category} />
          </Accordion.body>
        </div>
      ))}
    </Accordion>
  );
};

export default ChecklistAnswerSection;
