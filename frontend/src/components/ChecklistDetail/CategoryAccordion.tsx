import ChecklistAnswer from '@/components/ChecklistDetail/CheckListAnswer';
import Divider from '@/components/common/Divider/Divider';
import { ChecklistCategoryQuestions } from '@/types/checklist';

interface Props {
  category: ChecklistCategoryQuestions;
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
