import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Category, CategoryName } from '@/types/category';
import { ChecklistCategoryQnA, ChecklistCategoryQuestions } from '@/types/checklist';

interface ChecklistState {
  checklistCategoryQnA: ChecklistCategoryQnA[];
  categories: Category[];
  reset: () => void;
  getCategoryQnA: (categoryId: number) => ChecklistCategoryQnA | undefined;
  initAnswerSheetIfEmpty: (questions: ChecklistCategoryQuestions[]) => void;
  set: (answers: ChecklistCategoryQnA[]) => void;
  _parseCategory: () => void;
  _isEmptyCategoryQnA: () => boolean;
}

const useChecklistStore = create<ChecklistState>()(
  persist(
    (set, get) => ({
      checklistCategoryQnA: [],
      categories: [],

      initAnswerSheetIfEmpty: (questions: ChecklistCategoryQuestions[]) => {
        if (!get()._isEmptyCategoryQnA()) return;

        const checklistCategoryQnA: ChecklistCategoryQnA[] = questions.map(category => ({
          categoryId: category.categoryId,
          categoryName: category.categoryName,
          questions: category.questions.map(question => ({
            ...question,
            answer: 'NONE',
          })),
        }));

        set({ checklistCategoryQnA });
        get()._parseCategory();
      },

      getCategoryQnA: (categoryId: number) => {
        const { checklistCategoryQnA } = get();
        return checklistCategoryQnA.find(category => category.categoryId === categoryId);
      },

      set: (checklistCategoryQnA: ChecklistCategoryQnA[]) => {
        set({ checklistCategoryQnA });
        get()._parseCategory();
      },
      reset: () => {
        set({ checklistCategoryQnA: [], categories: [] });
      },

      _isEmptyCategoryQnA: () => get().checklistCategoryQnA.length === 0,
      _parseCategory: () => {
        const { checklistCategoryQnA } = get();
        const categories = checklistCategoryQnA.map(category => ({
          categoryId: category.categoryId,
          categoryName: category.categoryName as CategoryName,
        }));

        set({ categories });
      },
    }),
    {
      name: 'checklist-answer',
      partialize: state => ({
        checklistCategoryQnA: state.checklistCategoryQnA,
        validCategory: state.categories,
        // actions는 저장하지 않음
      }),
    },
  ),
);

export default useChecklistStore;
