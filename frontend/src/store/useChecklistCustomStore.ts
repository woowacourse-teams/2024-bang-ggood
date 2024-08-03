import { create } from 'zustand';

import { CategoryAndQuestion, ChecklistCategoryQnIsChecked, ChecklistQuestionWithIsChecked } from '@/types/checklist';

interface ChecklistCustomState {
  selectedQuestions: number[];
  checklistAllQuestionList: ChecklistCategoryQnIsChecked[];

  setChecklistAllQuestionList: (answers: ChecklistCategoryQnIsChecked[]) => void;
  findCategoryQuestion: ({ categoryId, questionId }: CategoryAndQuestion) => ChecklistQuestionWithIsChecked;
  categoryQnA: (categoryId: number) => ChecklistCategoryQnIsChecked;
}

const useChecklistCustomStore = create<ChecklistCustomState>((set, get) => ({
  selectedQuestions: [],
  checklistAllQuestionList: [],

  setChecklistAllQuestionList: (questions: ChecklistCategoryQnIsChecked[]) => {
    set({ checklistAllQuestionList: questions });
  },

  categoryQnA: (categoryId: number) => {
    const { checklistAllQuestionList } = get();
    return checklistAllQuestionList.filter(category => category.categoryId === categoryId)[0];
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
