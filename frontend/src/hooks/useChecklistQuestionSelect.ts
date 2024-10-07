import useChecklistQuestionSelectStore from '@/store/useChecklistQuestionSelectStore';
import { CategoryAndQuestion } from '@/types/checklist';

export interface UpdateCheckProps extends CategoryAndQuestion {
  isSelected: boolean;
}

const useChecklistQuestionSelect = () => {
  const { setChecklistAllQuestionList, checklistAllQuestionList, selectedQuestions } =
    useChecklistQuestionSelectStore();

  const toggleQuestionSelect = ({ categoryId, questionId, isSelected }: UpdateCheckProps) => {
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

  return { toggleQuestionSelect };
};

export default useChecklistQuestionSelect;
