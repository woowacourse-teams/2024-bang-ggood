import Divider from '@/components/common/Divider/Divider';
import ChecklistQuestion from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestion';
import useChecklist from '@/store/useChecklist';

// interface QuestionProps {
//   category: ChecklistCategoryQuestions;
//   toggleOpen?: (id: number) => void;
//   isAccordianOpen?: boolean;
//   addAnswer: ({ questionId, newAnswer }: addAnswerProps) => void;
//   deleteAnswer: (questionId: number) => void;
//   questionSelectedAnswer: (questionId: number) => EmotionType | void;
//   type: 'question';
// }

// interface AnswerProps {
//   category: ChecklistCategoryQuestions;
//   toggleOpen?: (id: number) => void;
//   isAccordianOpen?: boolean;
//   type: 'preview';
// }

// type ChecklistType = QuestionProps | AnswerProps;

const ChecklistCategory = () => {
  // const { type } = props;
  // const isPreview = type === 'preview';
  const { checklistQuestions } = useChecklist();

  // return (
  //   <>
  //     {checklistAnswers.map(category => {
  //       <ChecklistAnswer key={`answer-${category.questionId}`} checklistAnswers={checklistAnswers} />;
  //       {
  //         index !== questions.length - 1 && <Divider />;
  //       }
  //     })}
  //   </>
  // );

  return (
    <>
      {checklistQuestions.map((category, index) => {
        const { questions } = category;
        questions.map(question => {
          return (
            <>
              <ChecklistQuestion key={`question-${question.questionId}`} question={question} />
              {index !== questions.length - 1 && <Divider />}
            </>
          );
        });
      })}
    </>
  );
};

export default ChecklistCategory;
