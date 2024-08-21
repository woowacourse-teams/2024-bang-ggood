import useChecklistCustomStore from '@/store/useChecklistCustomStore';
import { CategoryAndQuestion } from '@/types/checklist';

export interface UpdateCheckProps extends CategoryAndQuestion {
  isSelected: boolean;
}

const useChecklistQuestionUpdate = () => {
  const { setChecklistAllQuestionList, checklistAllQuestionList } = useChecklistCustomStore();

  const updateCheckQuestion = ({ categoryId, questionId, isSelected }: UpdateCheckProps) => {
    const targetCategory = checklistAllQuestionList.find(category => category.categoryId === categoryId);

    if (targetCategory) {
      const updatedCategory = {
        ...targetCategory,
        questions: targetCategory.questions.map(question =>
          question.questionId === questionId ? { ...question, isSelected } : question,
        ),
      };

      const newCategories = checklistAllQuestionList.map(category =>
        category.categoryId === categoryId ? updatedCategory : category,
      );

      setChecklistAllQuestionList(newCategories);
    }
  };

  return { updateCheckQuestion };
};

export default useChecklistQuestionUpdate;
