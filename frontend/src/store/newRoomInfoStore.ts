import { createStore } from 'zustand';

import { roomFloorLevels, roomOccupancyPeriods } from '@/constants/roomInfo';
import { RoomInfo0 } from '@/types/room';

type NumberToString<T> = T extends number | string ? string : T;

export const initialRoomInfo = {
  roomName: { rawValue: '', errorMessage: '' },
  deposit: { rawValue: '', errorMessage: '' },
  rent: { rawValue: '', errorMessage: '' },
  maintenanceFee: { rawValue: '', errorMessage: '' },
  contractTerm: { rawValue: '', errorMessage: '' },
  type: { rawValue: '', errorMessage: '' },
  size: { rawValue: '', errorMessage: '' },
  floor: { rawValue: '', errorMessage: '' },
  floorLevel: { rawValue: roomFloorLevels[0], errorMessage: '' },
  structure: { rawValue: '', errorMessage: '' },
  realEstate: { rawValue: '', errorMessage: '' },
  occupancyMonth: { rawValue: `${new Date().getMonth() + 1}`, errorMessage: '' },
  occupancyPeriod: { rawValue: roomOccupancyPeriods[0], errorMessage: '' },
  summary: { rawValue: '', errorMessage: '' },
  memo: { rawValue: '', errorMessage: '' },

  buildingName: { rawValue: '', errorMessage: '' },
  station: { rawValue: '', errorMessage: '' },
  walkingTime: { rawValue: '', errorMessage: '' },
  address: { rawValue: '', errorMessage: '' },
  includedMaintenances: { rawValue: [], errorMessage: '' },
};
type RoomInfoState = { [k in keyof RoomInfo0]: { rawValue: NumberToString<RoomInfo0[k]>; errorMessage: string } };

export const newRoomInfoStore = createStore<
  RoomInfoState & {
    actions: { set: (o: Partial<RoomInfoState>) => void; get: () => void; reset: () => void };
  }
>()((set, get) => ({
  ...initialRoomInfo,
  actions: {
    set,
    get,
    reset: () => set({ ...initialRoomInfo }),
  },
}));

export default newRoomInfoStore;
