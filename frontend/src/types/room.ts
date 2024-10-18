import { roomOccupancyPeriods } from '@/constants/roomInfo';
import { SubwayStation } from '@/types/subway';

export type OccupancyPeriod = (typeof roomOccupancyPeriods)[number];

export type RoomInfo = Partial<{
  roomName: string;
  deposit: number;
  rent: number;
  maintenanceFee: number;
  contractTerm: number;
  floorLevel: string;
  floor: number;
  station: SubwayStation[];
  realEstate: string;
  size: number;
  structure: string;
  occupancyMonth: number;
  occupancyPeriod: OccupancyPeriod;
  summary: string;
  memo: string;
  type: string;
  createdAt?: string;
  address: string;
  buildingName: string;
  includedMaintenances: number[]; // 관리비 포함항목
}>;

export type RoomInfoName = keyof RoomInfo;
