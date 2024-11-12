import { Position } from '@/types/address';
import { RoomInfo } from '@/types/room';
import { SubwayStation } from '@/types/subway';

export interface CategoryScore {
  categoryId: number;
  categoryName: string;
  score: number | null;
}

export interface ChecklistCompare extends RoomInfo {
  checklistId: number;
  options: number[];
  categories: CategoryScore[];
  nearSubwayStations: SubwayStation[];
  geolocation: Position;
}
