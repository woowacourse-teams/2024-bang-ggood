import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { AnswerType } from '@/types/answer';
import { Category } from '@/types/category';
import {
  CategoryAndQuestion,
  ChecklistCategory,
  ChecklistCategoryWithAnswer,
  ChecklistQuestionWithAnswer,
} from '@/types/checklist';

interface ChecklistState {
  checklistCategoryQnA: ChecklistCategoryWithAnswer[];
  categories: Category[];
  actions: {
    reset: () => void;
    getCategory: (categoryId: number) => ChecklistCategoryWithAnswer | undefined;
    getCategoryAndQuestion: (props: CategoryAndQuestion) => {
      category: ChecklistCategoryWithAnswer;
      question: ChecklistQuestionWithAnswer;
    };
    getQuestionAnswer: (props: CategoryAndQuestion) => AnswerType;
    initAnswerSheetIfEmpty: (questions: ChecklistCategory[]) => void;
    set: (answers: ChecklistCategoryWithAnswer[]) => void;
    _parseCategory: () => void;
  };
}

/**
 * useChecklistStore 체크리스트의 질문 상태를 관리하는 스토어 입니다.
 */
const useChecklistStore = create<ChecklistState>()(
  persist(
    (set, get) => ({
      /**
       * 체크리스트의 질문과 답변이 모두 담겨 있습니다.
       */
      checklistCategoryQnA: [],
      /**
       * 체크리스트의 카테고리가 id, name 형태로 배열로 담겨 있습니다.
       */
      categories: [],

      actions: {
        /**
         * 체크리스트의 상태를 세팅해주는 함수입니다.
         *  @param {ChecklistCategory[]} questions 체크리스트의 카테고리별로 질문들이 담겨 있습니다.
         * 받은 질문들을 바탕으로 answer 를 추가한 답안지 객체를 생성합니다.
         */
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
        },

        set: (checklistCategoryQnA: ChecklistCategoryWithAnswer[]) => {
          set({ checklistCategoryQnA });
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

        /**
         * 체크리스트의 카테고리를 찾는 함수입니다. 해당 카테고리 id 와 일치하는 카테고리를 찾아서 반환합니다.
         */
        getCategory: (categoryId: number): ChecklistCategoryWithAnswer => {
          const targetCategory = get().checklistCategoryQnA.find(category => category.categoryId === categoryId);
          if (!targetCategory) {
            throw new Error(`카테고리 (ID: ${categoryId})를 찾을 수 없습니다.`);
          }
          return targetCategory;
        },
        /**
         * 체크리스트의 categoryId 와 questionId 에 일치하는 카테고리와 질문을 찾아서 반환하는 함수입니다.
         */
        getCategoryAndQuestion: ({ categoryId, questionId }: CategoryAndQuestion) => {
          const targetCategory = get().actions.getCategory(categoryId);
          if (!targetCategory) {
            throw new Error(`카테고리 (ID: ${categoryId})를 찾을 수 없습니다.`);
          }

          const targetQuestion = targetCategory.questions.find(q => q.questionId === questionId);
          if (!targetQuestion) {
            throw new Error(`질문 (ID: ${questionId})을 카테고리 (ID: ${categoryId}) 내에서 찾을 수 없습니다.`);
          }

          return { category: targetCategory, question: targetQuestion };
        },
        /**
         * 체크리스트의 categoryId 와 questionId 에 일치하는 답변만을 찾아 반환하는 함수입니다.
         */
        getQuestionAnswer: ({ categoryId, questionId }: CategoryAndQuestion): AnswerType => {
          const { question } = get().actions.getCategoryAndQuestion({ categoryId, questionId });
          return question.answer;
        },
      },
    }),
    {
      name: 'checklist-answer',
      partialize: ({ checklistCategoryQnA, categories }) => ({
        checklistCategoryQnA,
        categories,
      }),
    },
  ),
);

export default useChecklistStore;
