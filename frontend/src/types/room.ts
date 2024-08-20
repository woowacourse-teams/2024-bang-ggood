import { roomIncludedUtilites } from '@/constants/roomInfo';
import { Address } from '@/types/address';

export type OccupancyPeriod = '초' | '중순' | '말';

export type RoomInfo = Partial<{
  roomName: string;
  address: Address;
  deposit: number;
  rent: number;
  includedUtilities: IncludedUtilities; // 관리비 포함항목
  maintenanceFee: number;
  contractTerm: number;
  floorLevel: string;
  floor: number;
  station: string;
  walkingTime: number;
  realEstate: string;
  size: number;
  structure: string;
  occupancyMonth: number;
  occupancyPeriod: OccupancyPeriod;
  summary: string;
  memo: string;
  createdAt?: string;
}>;
export type RoomInfoName = keyof RoomInfo;
export interface IncludedUtilities {
  water: boolean;
  electricity: boolean;
  internet: boolean;
  gas: boolean;
}
export type UtilityName = (typeof roomIncludedUtilites)[number];
export type UtilityValue = keyof IncludedUtilities;
