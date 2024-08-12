import { AnswerType } from '@/types/answer';
import { CategoryScore } from '@/types/category';
import { RoomInfo } from '@/types/room';

export interface CategoryAndQuestion {
  categoryId: number;
  questionId: number;
}

interface ChecklistCategoryBase {
  categoryId: number;
  categoryName: string;
}

export interface ChecklistQuestion {
  questionId: number;
  title: string;
  subtitle: string | null;
}

// 기본 체크리스트
export interface ChecklistCategoryQuestions extends ChecklistCategoryBase {
  questions: ChecklistQuestion[];
}

// 체크리스트 작성: 모든 질문 + 답변
export interface ChecklistCategoryQnA extends ChecklistCategoryBase {
  questions: OneQuestionWithAnswer[];
}

// 하나의 질문 + 답변 컴포넌트
export interface OneQuestionWithAnswer extends ChecklistQuestion {
  answer: AnswerType;
}

// 체크리스트 커스텀
export interface ChecklistCategoryQnIsSelected extends ChecklistCategoryBase {
  questions: ChecklistQuestionWithIsSelected[];
}

export interface ChecklistQuestionWithIsSelected extends ChecklistQuestion {
  isSelected: boolean;
}

export interface ChecklistPreview extends RoomInfo {
  checklistId: number;
  createdAt: string;
  // TODO: summary roomInfo 에 들어가는지 확인
  summary: string;
  isLiked: boolean;
}

export interface Option {
  optionId: number;
  optionName: string;
}

export interface ChecklistCompare {
  room: RoomInfo;
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

// 체크리스트 POST API 용
interface AnswerPostForm {
  questionId: number;
  answer: AnswerType;
}

export interface ChecklistPostForm {
  room: RoomInfo;
  options: number[];
  questions: AnswerPostForm[];
}
