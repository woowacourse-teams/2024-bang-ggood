export type RoomInfo = Partial<{
  roomName: string;
  address: string;
  deposit: number;
  rent: number;
  // TODO: 관리비 항목 :  백엔드 작업 프로퍼티 확인하기
  fee: number;
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
