import { Badge } from '@/types/badge';
import { CategoryScore } from '@/types/category';
import { Emotion } from '@/types/emotionAnswer';
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
  answer?: Emotion;
}

export interface ChecklistFormAfterAnswer {
  questionId: number;
  answer: Emotion;
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
  rank: number;
  score: number;
  options: number[];
  categories: CategoryScore[];
}

export interface ChecklistInfo {
  room: RoomInfo;
  checklistId: number;
  options: number[];
  categories: ChecklistCategoryQuestions[];
}
