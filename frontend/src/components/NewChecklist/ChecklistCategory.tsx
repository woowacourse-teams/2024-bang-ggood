import Divider from '@/components/common/Divider/Divider';
import ChecklistAnswer from '@/components/NewChecklist/CheckListAnswer';
import ChecklistQuestion from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestion';
import { addAnswerProps } from '@/pages/NewChecklistPage';
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
