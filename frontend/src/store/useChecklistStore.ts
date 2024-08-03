import { create } from 'zustand';

import { Category, CategoryName } from '@/types/category';
import {
  CategoryAndQuestion,
  ChecklistCategoryQnA,
  ChecklistCategoryQnIsChecked,
  ChecklistCategoryQuestions,
  ChecklistQuestionWithAnswer,
} from '@/types/checklist';

interface ChecklistState {
  basicInfo: Record<string, unknown>;
  checklistCategoryQnA: ChecklistCategoryQnA[];
  validCategory: Category[];
  checklistAllQuestionList: ChecklistCategoryQnIsChecked[];

  isCategoryQuestionAllCompleted: (targetId: number) => boolean;
  findCategoryQuestion: ({ categoryId, questionId }: CategoryAndQuestion) => ChecklistQuestionWithAnswer;
  categoryQnA: (categoryId: number) => ChecklistCategoryQnA;
  setValidCategory: () => void;
  setAnswerInQuestion: (questions: ChecklistCategoryQuestions[]) => void;
  setAnswers: (answers: ChecklistCategoryQnA[]) => void;
  setChecklistAllQuestionList: (answers: ChecklistCategoryQnIsChecked[]) => void;
}

const useChecklistStore = create<ChecklistState>((set, get) => ({
  basicInfo: {},
  checklistCategoryQnA: [],
  checklistAllQuestionList: [],
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

  setChecklistAllQuestionList: (questions: ChecklistCategoryQnIsChecked[]) => {
    set({ checklistAllQuestionList: questions });
  },

  findCategoryQuestion: ({ categoryId, questionId }: { categoryId: number; questionId: number }) => {
    const { checklistCategoryQnA } = get();
    const targetCategory = checklistCategoryQnA?.find(category => category.categoryId === categoryId);

    if (targetCategory) {
      const targetQuestion = targetCategory.questions.find(q => q.questionId === questionId);
      if (targetQuestion) {
        return targetQuestion;
      }
    }

    return null;
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
