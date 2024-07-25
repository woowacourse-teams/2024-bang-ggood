import { Badge } from '@/types/badge';
import { CategoryScore } from '@/types/category';
import { RoomInfo } from '@/types/room';

export interface ChecklistCategoryQuestions {
  categoryId: number;
  categoryName: string;
  questions: ChecklistAnswer[];
}

export interface ChecklistQuestion {
  questionId: number;
  title: string;
  subtitle: string | null;
}

export interface ChecklistAnswer extends ChecklistQuestion {
  answer?: number | null;
}

export interface ChecklistFormAnswer {
  questionId: number;
  answer: number;
}

export interface Option {
  id: number;
  filled: string;
  unfilled: string;
}

export interface ChecklistPreview extends RoomInfo {
  checklistId: number;
  badge?: Badge[];
  createdAt: string;
}

export interface ChecklistCompare extends RoomInfo {
  checklistId: number;
  rank?: number;
  score: number;
  // TODO: 백엔드 api 변경으로 인한 수정
  // options: number[];
  optionCount: number;
  categories: CategoryScore[];
}
