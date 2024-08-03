import { create } from 'zustand';

import { ChecklistCategoryQnA, ChecklistCategoryQuestions } from '@/types/checklist';
import { EmotionName, EmotionNameWithNull } from '@/types/emotionAnswer';

interface ChecklistState {
  basicInfo: Record<string, unknown>;
  checklistCategoryQnA: ChecklistCategoryQnA[];
  questionSelectedAnswer: (targetId: number) => EmotionNameWithNull;
  addAnswer: (props: { questionId: number; newAnswer: EmotionName }) => void;
  deleteAnswer: (questionId: number) => void;
  setAnswerInQuestion: (questions: ChecklistCategoryQuestions[]) => void;
  setAnswers: (answers: ChecklistCategoryQnA[]) => void;
}

const useChecklistStore = create<ChecklistState>((set, get) => ({
  basicInfo: {},
  checklistCategoryQnA: [],

  setAnswerInQuestion: (questions: ChecklistCategoryQuestions[]) => {
    const checklistCategoryQnA: ChecklistCategoryQnA[] = questions.map(category => ({
      categoryId: category.categoryId,
      categoryName: category.categoryName,
      questions: category.questions.map(question => ({
        // TODO : #194 커밋에서 answer:null로 되어있던데, 이것때문에 post요청시 무조건 사용자응답이 null로 가고있습니다.
        // grade, memo를 알맞게 수정필요
        ...question,
        grade: null,
        memo: null,
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
        return targetQuestion.grade;
      }
    }
    return null;
  },

  addAnswer: ({ questionId, newAnswer }: { questionId: number; newAnswer: EmotionName }) => {
    set(state => {
      const newCategories = state.checklistCategoryQnA.map(category => ({
        ...category,
        questions: category.questions.map(question =>
          question.questionId === questionId ? { ...question, grade: newAnswer } : question,
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
          question.questionId === questionId ? { ...question, grade: null } : question,
        ),
      }));
      return { ...state, checklistCategoryQnA: newCategories };
    });
  },
}));

export default useChecklistStore;
