import useChecklistCustomStore from '@/store/useChecklistCustomStore';

export interface Props {
  questionId: number;
  categoryId: number;
}

export interface UpdateCheckProps extends Props {
  isChecked: boolean;
}

const useChecklistQuestionUpdate = () => {
  const { setChecklistAllQuestionList, checklistAllQuestionList } = useChecklistCustomStore();

  const updateCheckQuestion = ({ categoryId, questionId, isChecked }: UpdateCheckProps) => {
    const targetCategory = checklistAllQuestionList.find(category => category.categoryId === categoryId);

    if (targetCategory) {
      const updatedCategory = {
        ...targetCategory,
        questions: targetCategory.questions.map(question =>
          question.questionId === questionId ? { ...question, isChecked } : question,
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
