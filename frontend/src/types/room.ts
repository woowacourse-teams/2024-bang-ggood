export interface RoomInfo {
  roomName: string;
  address?: string;
  deposit?: number;
  rent?: number;
  contractTerm?: number;
  floor?: number;
  station?: string;
  walkingTime?: number;
  realEstate?: string;
}

export type RoomBasicInfoName = keyof RoomInfo;
