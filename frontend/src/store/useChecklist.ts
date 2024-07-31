import { create } from 'zustand';

import { ChecklistCategoryQnA, ChecklistCategoryQuestions } from '@/types/checklist';
import { EmotionType } from '@/types/emotionAnswer';

interface ChecklistState {
  basicInfo: Record<string, unknown>;
  checklistCategoryQnA: ChecklistCategoryQnA[];
  questionSelectedAnswer: (targetId: number) => EmotionType | null;
  addAnswer: (props: { questionId: number; newAnswer: EmotionType }) => void;
  deleteAnswer: (questionId: number) => void;
  setAnswerInQuestion: (questions: ChecklistCategoryQuestions[]) => void;
  setAnswers: (answers: ChecklistCategoryQnA[]) => void;
}

const useChecklist = create<ChecklistState>((set, get) => ({
  basicInfo: {},
  checklistCategoryQnA: [],

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

  setAnswers: (answers: ChecklistCategoryQnA[]) => {
    set({ checklistCategoryQnA: answers });
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

export default useChecklist;
