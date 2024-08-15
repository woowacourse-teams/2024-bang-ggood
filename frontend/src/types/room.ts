export type RoomInfo = Partial<{
  roomName: string;
  address: string;
  deposit: number;
  rent: number;
  contractTerm: number;
  floor: number;
  station: string;
  walkingTime: number;
  realEstate: string;
  type: string;
  size: number;
  floorLevel: string;
  structure: string;
  summary: string;
  memo: string;
  createdAt?: string;
}>;

export type RoomInfoName = keyof RoomInfo;
