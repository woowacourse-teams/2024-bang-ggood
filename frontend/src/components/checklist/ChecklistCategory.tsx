import ChecklistAnswer from '@/components/checklist/CheckListAnswer';
import ChecklistQuestion from '@/components/checklist/ChecklistQuestion';
import { addAnswerProps } from '@/pages/ChecklistPage';
import { ChecklistCategoryQuestions } from '@/types/checklist';

interface Props {
  category: ChecklistCategoryQuestions;
  // eslint-disable-next-line no-unused-vars
  toggleOpen?: (id: number) => void;
  isAccordianOpen?: boolean;
  addAnswer: ({ questionId, newAnswer }: addAnswerProps) => void;
  deleteAnswer: (questionId: number) => void;
  isAnswer?: boolean;
}

const ChecklistCategory = ({ category, addAnswer, deleteAnswer, isAnswer = false }: Props) => {
  return (
    <>
      {category.questions.map(question =>
        isAnswer ? (
          <ChecklistAnswer key={question.questionId} QandA={question} />
        ) : (
          <ChecklistQuestion
            key={question.questionId}
            question={question}
            addAnswer={addAnswer}
            deleteAnswer={deleteAnswer}
          />
        ),
      )}
    </>
  );
};

export default ChecklistCategory;
