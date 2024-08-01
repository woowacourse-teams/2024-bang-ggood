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
  subtitle?: string;
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

export interface ChecklistPreview extends RoomInfo {
  checklistId: number;
  badge?: Badge[];
  createdAt: string;
}

export interface Option {
  optionId: number;
  optionName: string;
}

export interface ChecklistCompare extends RoomInfo {
  checklistId: number;
  rank: number;
  score: number;
  options: Option[];
  categories: CategoryScore[];
}

export interface ChecklistInfo {
  checklistId: number;
  score: number;
  room: RoomInfo;
  options: Option[];
  categories: ChecklistCategoryQuestions[];
}
