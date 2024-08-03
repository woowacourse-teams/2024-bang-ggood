import { create } from 'zustand';

import { Category, CategoryName } from '@/types/category';
import { ChecklistCategoryQnA, ChecklistCategoryQuestions } from '@/types/checklist';

interface ChecklistState {
  basicInfo: Record<string, unknown>;
  checklistCategoryQnA: ChecklistCategoryQnA[];
  validCategory: Category[];

  isCategoryQuestionAllCompleted: (targetId: number) => boolean;
  categoryQnA: (categoryId: number) => ChecklistCategoryQnA;
  setValidCategory: () => void;
  setAnswerInQuestion: (questions: ChecklistCategoryQuestions[]) => void;
  setAnswers: (answers: ChecklistCategoryQnA[]) => void;
}

const useChecklistStore = create<ChecklistState>((set, get) => ({
  basicInfo: {},
  checklistCategoryQnA: [],
  validCategory: [],

  setAnswerInQuestion: (questions: ChecklistCategoryQuestions[]) => {
    const checklistCategoryQnA: ChecklistCategoryQnA[] = questions.map(category => ({
      categoryId: category.categoryId,
      categoryName: category.categoryName,
      questions: category.questions.map(question => ({
        ...question,
        memo: null,
        answer: null,
      })),
    }));
    set({ checklistCategoryQnA });
  },

  setValidCategory: () => {
    const { checklistCategoryQnA } = get();
    const validCategory = checklistCategoryQnA.map(category => ({
      categoryId: category.categoryId,
      categoryName: category.categoryName as CategoryName,
    }));
    set({ validCategory });
  },

  categoryQnA: (categoryId: number) => {
    const { checklistCategoryQnA } = get();
    return checklistCategoryQnA.filter(category => category.categoryId === categoryId)[0];
  },

  setAnswers: (answers: ChecklistCategoryQnA[]) => {
    set({ checklistCategoryQnA: answers });
  },

  isCategoryQuestionAllCompleted: (targetId: number) => {
    const { checklistCategoryQnA } = get();
    const targetCategory = checklistCategoryQnA.filter(category => category.categoryId === targetId)[0];
    if (targetCategory?.questions) {
      return !targetCategory?.questions?.find(question => question === null);
    }
    return true;
  },
}));

export default useChecklistStore;
