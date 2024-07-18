export interface ChecklistCategoryQuestions {
  categoryId: number;
  categoryName: string;
  questions: ChecklistAnswer[];
}

export type ChecklistCateogoryName = '청결' | '방 컨디션' | '편의시설' | '옵션' | '주거환경' | '안전' | '경제적';

export interface ChecklistQuestion {
  questionId: number;
  questionTitle: string;
  questionSubtitle: string | null;
}

export interface ChecklistAnswer extends ChecklistQuestion {
  answer?: number | null;
}
