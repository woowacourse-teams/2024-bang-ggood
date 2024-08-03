import { create } from 'zustand';

import { Category, CategoryName } from '@/types/category';
import { ChecklistCategoryQnA, ChecklistCategoryQuestions } from '@/types/checklist';
import { EmotionType } from '@/types/emotionAnswer';

interface ChecklistState {
  basicInfo: Record<string, unknown>;
  checklistCategoryQnA: ChecklistCategoryQnA[];
  questionSelectedAnswer: (targetId: number) => EmotionType | null;
  addAnswer: (props: { questionId: number; newAnswer: EmotionType }) => void;
  isCategoryQuestionAllCompleted: (targetId: number) => boolean;
  deleteAnswer: (questionId: number) => void;
  categoryQnA: (categoryId: number) => ChecklistCategoryQnA;
  validCategory: Category[];
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
        answer: null,
      })),
    }));
    set({ checklistCategoryQnA });
  },

  categoryQnA: (categoryId: number) => {
    const { checklistCategoryQnA } = get();
    return checklistCategoryQnA.filter(category => category.categoryId === categoryId)[0];
  },

  setAnswers: (answers: ChecklistCategoryQnA[]) => {
    set({ checklistCategoryQnA: answers });
  },

  setValidCategory: () => {
    const { checklistCategoryQnA } = get();
    const validCategory = checklistCategoryQnA.map(category => ({
      categoryId: category.categoryId,
      categoryName: category.categoryName as CategoryName,
    }));
    set({ validCategory });
  },

  isCategoryQuestionAllCompleted: (targetId: number) => {
    const { checklistCategoryQnA } = get();
    const targetCategory = checklistCategoryQnA.filter(category => category.categoryId === targetId)[0];
    if (targetCategory?.questions) {
      return !targetCategory?.questions?.find(question => question === null);
    }
    return true;
  },

  questionSelectedAnswer: (targetId: number) => {
    const { checklistCategoryQnA } = get();
    for (const category of checklistCategoryQnA) {
      const targetQuestion = category.questions.find(q => q.questionId === targetId);
      if (targetQuestion) {
        return targetQuestion.answer;
      }
    }
    return null;
  },

  addAnswer: ({ questionId, newAnswer }: { questionId: number; newAnswer: EmotionType }) => {
    set(state => {
      const newCategories = state.checklistCategoryQnA.map(category => ({
        ...category,
        questions: category.questions.map(question =>
          question.questionId === questionId ? { ...question, answer: newAnswer } : question,
        ),
      }));
      return { ...state, checklistCategoryQnA: newCategories };
    });
  },

  deleteAnswer: (questionId: number) => {
    set(state => {
      const newCategories = state.checklistCategoryQnA.map(category => ({
        ...category,
        questions: category.questions.map(question =>
          question.questionId === questionId ? { ...question, answer: null } : question,
        ),
      }));
      return { ...state, checklistCategoryQnA: newCategories };
    });
  },
}));

export default useChecklistStore;
