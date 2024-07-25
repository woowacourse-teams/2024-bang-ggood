import { Badge } from '@/types/Badge';
import { CategoryScore } from '@/types/category';
import { RoomInfo } from '@/types/Room';

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

export interface Option {
  id: number;
  filled: string;
  unfilled: string;
}

export interface ChecklistPreview extends RoomInfo {
  checklistId: number;
  badge: Badge[];
  createAt: string;
}

export interface ChecklistCompare extends RoomInfo {
  checklistId: number;
  rank: number;
  score: number;
  options: number[];
  categories: CategoryScore[];
}
