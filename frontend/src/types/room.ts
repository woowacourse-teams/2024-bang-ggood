import { AddressWithPosition } from '@/types/address';

export type OccupancyPeriod = '초' | '중순' | '말';

export type RoomInfo = Partial<{
  roomName: string;
  address: AddressWithPosition;
  deposit: number;
  rent: number;
  // includedUtilities : 관리비 포함항목 (전기, 수도 등).
  includedUtilities: string[]; // 지금 string[] 되어있지만 객체로바뀔예정
  maintenanceFee: number;
  contractTerm: number;
  floor: number;
  station: string;
  walkingTime: number;
  realEstate: string;
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
