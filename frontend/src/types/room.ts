import { AddressWithPosition } from '@/types/address';

export type OccupancyPeriod = '초' | '중순' | '말';

export type RoomInfo = Partial<{
  roomName: string;
  address: AddressWithPosition;
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
  occupancyMonth: number;
  occupancyPeriod: OccupancyPeriod;
  summary: string;
  memo: string;
  createdAt?: string;
}>;

export type RoomInfoName = keyof RoomInfo;
