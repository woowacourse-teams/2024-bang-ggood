import { AnswerType } from '@/types/answer';
import { CategoryScore } from '@/types/category';
import { Option } from '@/types/option';
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
}

// 체크리스트 비교
export interface ChecklistCompare {
  room: RoomInfo;
  checklistId: number;
  rank: number;
  score: number;
  optionCount: number;
  options: Option[];
  categories: CategoryScore[];
}

// 체크리스트 디테일
export interface ChecklistInfo {
  checklistId: number;
  isLiked: boolean;
  // TODO: score 삭제 필요
  score: number;
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
