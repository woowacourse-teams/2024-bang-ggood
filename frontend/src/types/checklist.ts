export interface ChecklistCategory {
  categoryId: number;
  category: string;
  questions: ChecklistAnswer[];
}

export interface ChecklistQuestion {
  questionId: number;
  questionTitle: string;
  questionSubtitle: string | null;
}

export interface ChecklistAnswer extends ChecklistQuestion {
  answer?: number | null;
}
