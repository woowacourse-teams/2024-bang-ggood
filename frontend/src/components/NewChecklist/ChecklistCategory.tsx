import Divider from '@/components/common/Divider/Divider';
import ChecklistQuestion from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestion';
import useChecklist from '@/store/useChecklist';

const ChecklistCategory = () => {
  const { checklistCategoryQnA } = useChecklist();

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
    </>
  );
};

export default ChecklistCategory;
