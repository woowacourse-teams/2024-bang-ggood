import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Category } from '@/types/category';
import { ChecklistCategory, ChecklistCategoryWithAnswer } from '@/types/checklist';

interface ChecklistState {
  checklistCategoryQnA: ChecklistCategoryWithAnswer[];
  categories: Category[];
  actions: {
    reset: () => void;
    getCategory: (categoryId: number) => ChecklistCategoryWithAnswer | undefined;
    initAnswerSheetIfEmpty: (questions: ChecklistCategory[]) => void;
    set: (answers: ChecklistCategoryWithAnswer[]) => void;
    _parseCategory: () => void;
  };
}

const useChecklistStore = create<ChecklistState>()(
  persist(
    (set, get) => ({
      checklistCategoryQnA: [],
      categories: [],

      actions: {
        initAnswerSheetIfEmpty: (questions: ChecklistCategory[]) => {
          if (get().checklistCategoryQnA.length !== 0) return;

          const checklistCategoryQnA: ChecklistCategoryWithAnswer[] = questions.map(category => ({
            categoryId: category.categoryId,
            categoryName: category.categoryName,
            questions: category.questions.map(question => ({
              ...question,
              answer: 'NONE',
            })),
          }));

          set({ checklistCategoryQnA });
          get().actions._parseCategory();
        },

        getCategory: (categoryId: number) => {
          return get().checklistCategoryQnA.find(category => category.categoryId === categoryId);
        },

        set: (checklistCategoryQnA: ChecklistCategoryWithAnswer[]) => {
          set({ checklistCategoryQnA });
          get().actions._parseCategory();
        },
        reset: () => {
          set({ checklistCategoryQnA: [], categories: [] });
        },

        _parseCategory: () => {
          const categories = get().checklistCategoryQnA.map(category => ({
            categoryId: category.categoryId,
            categoryName: category.categoryName,
          }));

          set({ categories });
        },
      },
    }),
    {
      name: 'checklist-answer',
      partialize: ({ checklistCategoryQnA, categories }) => ({
        checklistCategoryQnA,
        categories,
        // actions는 저장하지 않음
      }),
    },
  ),
);

export default useChecklistStore;
