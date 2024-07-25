import { ChecklistFormAfterAnswer } from '@/types/checklist';

export interface RoomInfo {
  name: string;
  address?: string;
  deposit?: number;
  rent?: number;
  contractTerm?: number;
  floor?: number;
  station?: string;
  walkingTime?: number;
  realEstate?: string;
}

export type RoomInfoName = keyof RoomInfo;

export interface ChecklistForm {
  room: RoomInfo;
  options: number[];
  questions: ChecklistFormAfterAnswer[];
}
