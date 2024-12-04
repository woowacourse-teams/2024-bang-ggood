import { Position } from '@/types/address';
import { ChecklistQuestion } from '@/types/checklist';
import { RoomInfo } from '@/types/room';
import { SubwayStation } from '@/types/subway';

export interface CategoryScore {
  categoryId: number;
  categoryName: string;
  score: number | null;
}

export interface RoomCompare extends RoomInfo {
  checklistId: number;
  options: number[];
  categories: { categories: CategoryScore[] };
  stations: { stations: SubwayStation[] };
  geolocation: Position;
}

export type SmallAnswerType = 'good' | 'bad' | 'none';

export type RoomCategoryDetail = Record<SmallAnswerType, ChecklistQuestion[]>;
