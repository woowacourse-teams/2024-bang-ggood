import { Badge } from '@/types/badge';
import { CategoryScore } from '@/types/category';
import { EmotionNameWithNone } from '@/types/emotionAnswer';
import { RoomInfo } from '@/types/room';

interface ChecklistCategoryBase {
  categoryId: number;
  categoryName: string;
}

export interface ChecklistCategoryQuestions extends ChecklistCategoryBase {
  questions: ChecklistQuestion[];
}

/*체크리스트 작성에서 쓰는 인터페이스 */
export interface ChecklistCategoryQnA extends ChecklistCategoryBase {
  questions: ChecklistQuestionWithAnswer[];
}

export interface ChecklistQuestionWithAnswer extends ChecklistQuestion {
  grade: EmotionNameWithNone;
  memo: string | null;
}

/*체크리스트 커스텀에서 쓰는 인터페이스 */
export interface ChecklistCategoryQnIsSelected extends ChecklistCategoryBase {
  questions: ChecklistQuestionWithIsSelected[];
}

export interface ChecklistQuestionWithIsSelected extends ChecklistQuestion {
  isSelected: boolean;
}

export interface ChecklistQuestion {
  questionId: number;
  title: string;
  subtitle: string | null;
}

/*체크리스트를 제공할 때 쓰는 인터페이스 */
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
