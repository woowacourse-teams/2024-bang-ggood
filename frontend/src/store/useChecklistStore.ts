import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Category, CategoryName } from '@/types/category';
import { ChecklistCategoryQnA, ChecklistCategoryQuestions } from '@/types/checklist';

interface ChecklistState {
  basicInfo: Record<string, unknown>;
  checklistCategoryQnA: ChecklistCategoryQnA[];
  validCategory: Category[];
  getCategoryQnA: (categoryId: number) => ChecklistCategoryQnA | undefined;
  _setValidCategory: () => void;
  makeAnswerSheet: (questions: ChecklistCategoryQuestions[]) => void;
  setAnswers: (answers: ChecklistCategoryQnA[]) => void;
}

const useChecklistStore = create<ChecklistState>()(
  persist(
    (set, get) => ({
      basicInfo: {},
      checklistCategoryQnA: [],
      validCategory: [],

      makeAnswerSheet: (questions: ChecklistCategoryQuestions[]) => {
        const checklistCategoryQnA: ChecklistCategoryQnA[] = questions.map(category => ({
          categoryId: category.categoryId,
          categoryName: category.categoryName,
          questions: category.questions.map(question => ({
            ...question,
            answer: 'NONE',
          })),
        }));

        set({ checklistCategoryQnA });
        get()._setValidCategory();
      },

      _setValidCategory: () => {
        const { checklistCategoryQnA } = get();
        const validCategory = checklistCategoryQnA.map(category => ({
          categoryId: category.categoryId,
          categoryName: category.categoryName as CategoryName,
        }));

        set({ validCategory });
      },

      getCategoryQnA: (categoryId: number) => {
        const { checklistCategoryQnA } = get();
        return checklistCategoryQnA.find(category => category.categoryId === categoryId);
      },

      setAnswers: (answers: ChecklistCategoryQnA[]) => {
        set({ checklistCategoryQnA: answers });
        get()._setValidCategory();
      },
    }),
    {
      name: 'checklist-answer',
      partialize: state => ({
        basicInfo: state.basicInfo,
        checklistCategoryQnA: state.checklistCategoryQnA,
        validCategory: state.validCategory,
        // actions는 저장하지 않음
      }),
    },
  ),
);

export default useChecklistStore;
