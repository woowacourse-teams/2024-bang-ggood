import Divider from '@/components/_common/Divider/Divider';
import ChecklistAnswer from '@/components/ChecklistDetail/CheckListAnswer';
import { ChecklistCategoryWithAnswer } from '@/types/checklist';

interface Props {
  category: ChecklistCategoryWithAnswer;
}

const CategoryAccordion = ({ category }: Props) => {
  return (
    <>
      {category.questions.map((question, index) => (
        <>
          <ChecklistAnswer key={`answer-${question.questionId}`} QuestionAndAnswer={question} />
          {index !== category.questions.length - 1 && <Divider />}
        </>
      ))}
    </>
  );
};

export default CategoryAccordion;
