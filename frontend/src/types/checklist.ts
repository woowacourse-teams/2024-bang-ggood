export interface ChecklistCategory {
  categoryId: number;
  category: string;
  questions: ChecklistQuestion[];
}

export interface ChecklistQuestion {
  questionId: number;
  questionTitle: string;
  questionSubtitle: string | null;
}
