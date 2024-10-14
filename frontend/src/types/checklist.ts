import { Position } from '@/types/address';
import { AnswerType } from '@/types/answer';
import { Category } from '@/types/category';
import { Option } from '@/types/option';
import { RoomInfo } from '@/types/room';
import { SubwayStation } from '@/types/subway';

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
export interface ChecklistCategory extends Category {
  questions: ChecklistQuestion[];
}

// 체크리스트 작성: 모든 질문 + 답변
export interface ChecklistCategoryWithAnswer extends Category {
  questions: ChecklistQuestionWithAnswer[];
}

// 하나의 질문 + 답변 컴포넌트
export interface ChecklistQuestionWithAnswer extends ChecklistQuestion {
  answer: AnswerType;
}

// 체크리스트 커스텀
export interface ChecklistCategoryWithIsSelected extends Category {
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

// 체크리스트 디테일
export interface ChecklistInfo {
  checklistId: number;
  isLiked: boolean;
  room: RoomInfo;
  options: Option[];
  categories: ChecklistCategoryWithAnswer[];
  stations: SubwayStation[];
}

export interface ChecklistSelectedQuestions {
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
  geolocation?: Position; //TODO: 나중에 지우기
}

export type MutateType = 'add' | 'edit';
