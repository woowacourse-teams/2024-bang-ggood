import { Badge } from '@/types/badge';
import { CategoryScore } from '@/types/category';
import { EmotionNameWithNone } from '@/types/emotionAnswer';
import { RoomInfo } from '@/types/room';

export interface ChecklistCategoryBase {
  categoryId: number;
  categoryName: string;
  questions: ChecklistQuestion[];
}
export interface ChecklistCategoryQuestions extends ChecklistCategoryBase {
  questions: ChecklistQuestion[];
}

export interface ChecklistCategoryQnA extends ChecklistCategoryBase {
  questions: ChecklistQuestionWithAnswer[];
}

export interface ChecklistCategoryQnIsChecked extends ChecklistCategoryBase {
  questions: ChecklistQuestionWithIsChecked[];
}

export interface ChecklistQuestion {
  questionId: number;
  title: string;
  subtitle: string | null;
}

// TODO: 인터페이스 리팩토링 필요
export interface ChecklistQuestionWithAnswer extends ChecklistQuestion {
  grade: EmotionNameWithNone;
  memo: string | null;
}

export interface ChecklistQuestionWithIsChecked extends ChecklistQuestion {
  isChecked: boolean;
}

export interface ChecklistAnswer {
  questionId: number;
  grade: EmotionNameWithNone;
  memo: string | null;
}

export interface ChecklistPreview extends RoomInfo {
  checklistId: number;
  badge: Badge[];
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
  optionCount: number;
  options: Option[];
  categories: CategoryScore[];
}

export interface ChecklistInfo {
  checklistId: number;
  score: number;
  createdAt: string;
  room: RoomInfo;
  options: Option[];
  categories: ChecklistCategoryQnA[];
}

export interface ChecklistCustom {
  questionIds: number[];
}

export interface CategoryAndQuestion {
  categoryId: number;
  questionId: number;
}
