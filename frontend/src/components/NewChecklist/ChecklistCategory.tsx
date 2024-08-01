import Divider from '@/components/common/Divider/Divider';
import ChecklistQuestion from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestion';
// <<<<<<< HEAD
// import { addAnswerProps } from '@/pages/NewChecklistPage/NewChecklistTemplate';
// import { ChecklistCategoryQuestions } from '@/types/checklist';
// interface QuestionProps {
//   category: ChecklistCategoryQuestions;
//   toggleOpen?: (id: number) => void;
//   isAccordianOpen?: boolean;
//   addAnswer: ({ questionId, newAnswer }: addAnswerProps) => void;
//   deleteAnswer: (questionId: number) => void;
//   questionSelectedAnswer: (questionId: number) => number | void;
//   type: 'question';
// }
// interface AnswerProps {
//   category: ChecklistCategoryQuestions;
//   toggleOpen?: (id: number) => void;
//   isAccordianOpen?: boolean;
//   type: 'answered';
// }
// type ChecklistType = QuestionProps | AnswerProps;
// const ChecklistCategory = (props: ChecklistType) => {
//   const { category, type } = props;
//   const isAnswered = type === 'answered';
//   return (
//     <>
//       {category.questions.map((question, index) =>
//         isAnswered ? (
//           <>
//             <ChecklistAnswer key={`answer-${question.questionId}`} QandA={question} />
//             {index !== category.questions.length - 1 && <Divider />}
//           </>
//         ) : (
//           <>
//             <ChecklistQuestion
//               key={`question-${question.questionId}`}
//               question={question}
//               questionSelectedAnswer={props.questionSelectedAnswer}
//             />
//             {index !== category.questions.length - 1 && <Divider />}
//           </>
//         ),
//       )}
// =======
import useChecklistStore from '@/store/useChecklistStore';

const ChecklistCategory = () => {
  const { checklistCategoryQnA } = useChecklistStore();

  return (
    <>
      {checklistCategoryQnA.map((category, index) => {
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
      {/* >>>>>>> dev-fe */}
    </>
  );
};

export default ChecklistCategory;
