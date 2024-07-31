import { create } from 'zustand';

// import { checklistQuestions } from '@/mocks/fixtures/checklistQuestions';
import { addAnswerProps } from '@/pages/ChecklistSummaryPage';
import { ChecklistAnswer, ChecklistCategoryQuestions } from '@/types/checklist';
import { EmotionType } from '@/types/emotionAnswer';

interface ChecklistState {
  basicInfo: Record<string, unknown>;
  checklistQuestions: ChecklistCategoryQuestions[];
  checklistAnswers: ChecklistAnswer[];
  selectedOptions: number[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<number[]>>;
  questionSelectedAnswer: (targetId: number) => EmotionType;
  addAnswer: (props: addAnswerProps) => void;
  deleteAnswer: (questionId: number) => void;
  setQuestions: (questions: ChecklistCategoryQuestions[]) => void;
}

const useChecklist = create<ChecklistState>((set, get) => ({
  basicInfo: {},
  checklistQuestions: null,
  checklistAnswers: [],
  selectedOptions: [],

  setQuestions: (questions: ChecklistCategoryQuestions[]) => {
    set(state => ({ ...state, checklistQuestions: questions }));
  },

  setSelectedOptions: (newOptions: number[]) => {
    set(state => ({ ...state, selectedOptions: newOptions }));
  },

  questionSelectedAnswer: targetId => {
    const { checklistAnswers } = get();
    const targetQuestion = checklistAnswers.filter(e => e.questionId === targetId);
    if (!targetQuestion[0]) return undefined;
    return targetQuestion[0]?.answer;
  },

  addAnswer: ({ questionId, newAnswer }: { questionId: number; newAnswer: EmotionType }) => {
    set(state => {
      const target = state.checklistAnswers.find(answer => answer.questionId === questionId);
      if (target) {
        const newAnswers = state.checklistAnswers.map(e =>
          e.questionId === questionId ? { ...e, answer: newAnswer } : e,
        );
        return { ...state, checklistAnswers: newAnswers };
      }
      return state;
    });
  },

  deleteAnswer: questionId => {
    set(state => ({
      checklistAnswers: state.checklistAnswers.filter(answer => answer.questionId !== questionId),
    }));
  },
}));

export default useChecklist;
