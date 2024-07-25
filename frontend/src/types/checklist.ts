import { Badge } from '@/types/badge';

export interface ChecklistCategoryQuestions {
  categoryId: number;
  categoryName: string;
  questions: ChecklistAnswer[];
}

export type ChecklistCateogoryName = '청결' | '방 컨디션' | '편의시설' | '옵션' | '주거환경' | '안전' | '경제적';

export interface ChecklistQuestion {
  questionId: number;
  title: string;
  subtitle: string | null;
}

export interface ChecklistAnswer extends ChecklistQuestion {
  answer?: number | null;
}

export interface Option {
  id: number;
  filled: string;
  unfilled: string;
}
export interface ChecklistPreview {
  checklistId: number;
  roomName: string;
  address: string;
  deposit: number;
  rent: number;
  createAt: string;
  badge: Badge[];
}
