import { RoomInfo } from '@/types/room';
import { Nullable } from '@/utils/utilityTypes';

export const NullRoomInfo: Nullable<Required<RoomInfo>> = {
  roomName: null,
  address: null,
  deposit: null,
  rent: null,
  contractTerm: null,
  floor: null,
  station: null,
  walkingTime: null,
  realEstate: null,
  type: null,
  size: null,
  floorLevel: null,
  structure: null,
};
