import { create } from 'zustand';

import { Category, CategoryName } from '@/types/category';
import { CategoryAndQuestion, ChecklistCategoryQnIsChecked, ChecklistQuestionWithIsChecked } from '@/types/checklist';

interface ChecklistCustomState {
  selectedQuestions: number[];
  checklistAllQuestionList: ChecklistCategoryQnIsChecked[];
  validCategory: Category[];

  setChecklistAllQuestionList: (answers: ChecklistCategoryQnIsChecked[]) => void;
  findCategoryQuestion: ({ categoryId, questionId }: CategoryAndQuestion) => ChecklistQuestionWithIsChecked | null;
  categoryQnA: (categoryId: number) => ChecklistCategoryQnIsChecked;
  setValidCategory: () => void;
}

const useChecklistCustomStore = create<ChecklistCustomState>((set, get) => ({
  selectedQuestions: [],
  checklistAllQuestionList: [],
  validCategory: [],

  setChecklistAllQuestionList: (questions: ChecklistCategoryQnIsChecked[]) => {
    set({ checklistAllQuestionList: questions });
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
