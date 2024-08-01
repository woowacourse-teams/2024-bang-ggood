import { ChecklistAnswer } from '@/types/checklist';

export interface RoomInfo {
  // TODO: roomName 이슈
  roomName?: string;
  name?: string;
  address?: string;
  deposit?: number;
  rent?: number;
  contractTerm?: number;
  floor?: number;
  station?: string;
  walkingTime?: number;
  realEstate?: string;
  type?: string;
  size?: number;
  floorLevel?: string;
}

export type RoomInfoName = keyof RoomInfo;

export interface ChecklistForm {
  room: RoomInfo;
  options: number[];
  questions: ChecklistAnswer[];
}
