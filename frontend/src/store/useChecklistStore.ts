import { create } from 'zustand';

import { Category, CategoryName } from '@/types/category';
import { ChecklistCategoryQnA, ChecklistCategoryQuestions } from '@/types/checklist';

interface ChecklistState {
  basicInfo: Record<string, unknown>;
  checklistCategoryQnA: ChecklistCategoryQnA[];
  validCategory: Category[];

  isCategoryQuestionAllCompleted: (targetId: number) => boolean;
  getCategoryQnA: (categoryId: number) => ChecklistCategoryQnA;

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
        answer: 'NONE',
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

  getCategoryQnA: (categoryId: number) => {
    const { checklistCategoryQnA } = get();
    return checklistCategoryQnA.filter(category => category.categoryId === categoryId)[0];
  },

  setAnswers: (answers: ChecklistCategoryQnA[]) => {
    set({ checklistCategoryQnA: answers });
  },

  isCategoryQuestionAllCompleted: (targetId: number) => {
    const { getCategoryQnA } = get();
    const targetCategory = getCategoryQnA(targetId);

    if (targetCategory) {
      return targetCategory.questions.every(question => question.answer !== 'NONE');
    }

    return false;
  },
}));

export default useChecklistStore;
