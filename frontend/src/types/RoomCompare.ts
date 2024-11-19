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
  categories: CategoryScore[];
  stations: SubwayStation[];
  geolocation: Position;
}

export interface RoomCategoryDetail {
  good: ChecklistQuestion[];
  bad: ChecklistQuestion[];
  none: ChecklistQuestion[];
}
