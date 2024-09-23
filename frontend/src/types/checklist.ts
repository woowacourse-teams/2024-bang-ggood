import { AnswerType } from '@/types/answer';
import { Category } from '@/types/category';
// import { CategoryScore } from '@/types/category';
import { Option } from '@/types/option';
import { RoomInfo } from '@/types/room';

export interface CategoryAndQuestion {
  categoryId: number;
  questionId: number;
}

export interface ChecklistQuestion {
  questionId: number;
  title: string;
  subtitle: string | null;
  highlights: string[];
}

// 기본 체크리스트
export interface ChecklistCategoryQuestions extends Category {
  questions: ChecklistQuestion[];
}

// 체크리스트 작성: 모든 질문 + 답변
export interface ChecklistCategoryQnA extends Category {
  questions: ChecklistQuestionWithAnswer[];
}

// 하나의 질문 + 답변 컴포넌트
export interface ChecklistQuestionWithAnswer extends ChecklistQuestion {
  answer: AnswerType;
}

// 체크리스트 커스텀
export interface ChecklistCategoryQnIsSelected extends Category {
  questions: ChecklistQuestionWithIsSelected[];
}

export interface ChecklistQuestionWithIsSelected extends ChecklistQuestion {
  isSelected: boolean;
}

// 체크리스트 카드
export interface ChecklistPreview {
  checklistId: number;
  roomName: string;
  address: string;
  deposit: number;
  rent: number;
  createdAt: string;
  summary: string;
  isLiked: boolean;
  station: string;
  walkingTime: number;
}

// TODO: 방비교 추후를 위해..
// 체크리스트 비교
export interface ChecklistCompare {
  room: RoomInfo;
  checklistId: number;
  rank: number;
  score: number;
  optionCount: number;
  options: Option[];
  // categories: CategoryScore[];
}

// 체크리스트 디테일
export interface ChecklistInfo {
  checklistId: number;
  isLiked: boolean;
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

export type MutateType = 'add' | 'edit';
