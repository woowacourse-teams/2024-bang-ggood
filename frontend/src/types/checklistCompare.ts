import { Position } from '@/types/address';
import { RoomInfo } from '@/types/room';

export interface CategoryScore {
  categoryId: number;
  categoryName: string;
  score: number;
}

export interface ChecklistCompare extends RoomInfo {
  checklistId: number;
  options: number[];
  categories: CategoryScore[];
  geolocation: Position;
}
