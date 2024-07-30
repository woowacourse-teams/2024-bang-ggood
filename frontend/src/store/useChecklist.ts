import { create } from 'zustand';

import { addAnswerProps } from '@/pages/ChecklistSummaryPage';
import { ChecklistFormAnswer } from '@/types/checklist';

interface ChecklistState {
  basicInfo: Record<string, unknown>;
  checklistAnswers: ChecklistFormAnswer[];
  questionSelectedAnswer: (targetId: number) => number;
  addAnswer: (props: addAnswerProps) => void;
  deleteAnswer: (questionId: number) => void;
}

const useChecklist = create<ChecklistState>((set, get) => ({
  basicInfo: {},
  checklistAnswers: [],

  questionSelectedAnswer: targetId => {
    const { checklistAnswers } = get();
    const targetQuestion = checklistAnswers.filter(e => e.questionId === targetId);
    if (!targetQuestion[0]) return undefined;
    return targetQuestion[0]?.answer;
  },

  addAnswer: ({ questionId, newAnswer }) => {
    set(state => {
      const target = state.checklistAnswers.find(answer => answer.questionId === questionId);
      if (target) {
        const newAnswers = state.checklistAnswers.map(answer =>
          answer.questionId === questionId ? { questionId, answer: newAnswer } : answer,
        );
        return { checklistAnswers: newAnswers };
      }
      return { checklistAnswers: [...state.checklistAnswers, { questionId, answer: newAnswer }] };
    });
  },

  deleteAnswer: questionId => {
    set(state => ({
      checklistAnswers: state.checklistAnswers.filter(answer => answer.questionId !== questionId),
    }));
  },
}));

export default useChecklist;
