import { create } from 'zustand';

import { Category, CategoryName } from '@/types/category';
import { CategoryAndQuestion, ChecklistCategoryCustom, ChecklistQuestionWithIsSelected } from '@/types/checklist';

interface ChecklistCustomState {
  selectedQuestions: number[];
  checklistAllQuestionList: ChecklistCategoryCustom[];
  validCategory: Category[];

  setChecklistAllQuestionList: (answers: ChecklistCategoryCustom[]) => void;
  findCategoryQuestion: ({ categoryId, questionId }: CategoryAndQuestion) => ChecklistQuestionWithIsSelected | null;
  categoryQnA: (categoryId: number) => ChecklistCategoryCustom;
  setValidCategory: () => void;
}

const useChecklistCustomStore = create<ChecklistCustomState>((set, get) => ({
  selectedQuestions: [],
  checklistAllQuestionList: [],
  validCategory: [],

  setChecklistAllQuestionList: (categoryQuestions: ChecklistCategoryCustom[]) => {
    const defaultSelectedQuestions = categoryQuestions.flatMap(category =>
      category.questions.filter(question => question.isSelected).map(question => question.questionId),
    );
    set({ selectedQuestions: defaultSelectedQuestions, checklistAllQuestionList: categoryQuestions });
  },

  categoryQnA: (categoryId: number) => {
    const { checklistAllQuestionList } = get();
    return checklistAllQuestionList?.filter(category => category.categoryId === categoryId)[0];
  },

  setValidCategory: () => {
    const { checklistAllQuestionList } = get();
    const validCategory = checklistAllQuestionList.map(category => ({
      categoryId: category.categoryId,
      categoryName: category.categoryName as CategoryName,
    }));
    set({ validCategory });
  },

  findCategoryQuestion: ({ categoryId, questionId }: { categoryId: number; questionId: number }) => {
    const { checklistAllQuestionList } = get();
    const targetCategory = checklistAllQuestionList?.find(category => category.categoryId === categoryId);

    if (targetCategory) {
      const targetQuestion = targetCategory.questions.find(q => q.questionId === questionId);
      if (targetQuestion) {
        return targetQuestion;
      }
    }

    return null;
  },
}));

export default useChecklistCustomStore;
