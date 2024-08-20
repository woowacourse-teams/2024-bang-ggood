import { Address } from '@/types/address';

export type OccupancyPeriod = '초' | '중순' | '말';

export type RoomInfo = Partial<{
  roomName: string;
  address: Address;
  deposit: number;
  rent: number;
  // includedUtilities : 관리비 포함항목 (전기, 수도 등).
  includedUtilities: IncludedUtilities;
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
export interface IncludedUtilities {
  water: boolean;
  electricity: boolean;
  internet: boolean;
  gas: boolean;
}

export type RoomInfoName = keyof RoomInfo;
