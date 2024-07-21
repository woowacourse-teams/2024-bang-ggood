import ChecklistAnswer from '@/components/checklist/CheckListAnswer';
import ChecklistQuestion from '@/components/checklist/ChecklistQuestion';
import Divider from '@/components/divider/Divider';
import { addAnswerProps } from '@/pages/ChecklistPage';
import { ChecklistCategoryQuestions } from '@/types/checklist';

interface QuestionProps {
  category: ChecklistCategoryQuestions;
  toggleOpen?: (id: number) => void;
  isAccordianOpen?: boolean;
  addAnswer: ({ questionId, newAnswer }: addAnswerProps) => void;
  deleteAnswer: (questionId: number) => void;
  type: 'question';
}

interface AnswerProps {
  category: ChecklistCategoryQuestions;
  toggleOpen?: (id: number) => void;
  isAccordianOpen?: boolean;
  type: 'preview';
}

type ChecklistType = QuestionProps | AnswerProps;

const ChecklistCategory = (props: ChecklistType) => {
  const { category, type } = props;
  const isPreview = type === 'preview';

  return (
    <>
      {category.questions.map((question, index) =>
        isPreview ? (
          <>
            <ChecklistAnswer key={question.questionId} QandA={question} />
            {index !== category.questions.length - 1 && <Divider />}
          </>
        ) : (
          <>
            <ChecklistQuestion
              key={question.questionId}
              question={question}
              addAnswer={props.addAnswer}
              deleteAnswer={props.deleteAnswer}
            />
            {index !== category.questions.length - 1 && <Divider />}
          </>
        ),
      )}
    </>
  );
};

export default ChecklistCategory;
