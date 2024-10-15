import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

import { roomFloorLevels, roomOccupancyPeriods } from '@/constants/roomInfo';
import { parseRoomInfo } from '@/hooks/useRoomInfoValidated';
import { RoomInfo } from '@/types/room';
import { Nullable } from '@/utils/utilityTypes';

import { mapObjUndefinedToNull, objectMap } from '../utils/typeFunctions';

type NumberToString<T> = T extends number | string ? string : T;

// TODO : API POST때 사용할 Mapper 함수 필요. structure(방구조: 처음에 null)
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

export type oneItem = { rawValue: string; errorMessage: string };
export type RawValues = { [k in keyof RoomInfo]: { rawValue: NumberToString<RoomInfo[k]> } };
export type RoomInfoState = {
  [k in keyof RoomInfo]: { rawValue: NumberToString<RoomInfo[k]>; errorMessage: string };
};

interface RoomInfoActions {
  set: (o: Partial<RoomInfoState>) => void;
  get: () => RoomInfoState;
  reset: () => void;
  setRawValues: (rawValues: Partial<RoomInfo>) => void;
  getRawValues: () => RawValues;
  getParsedValues: () => RoomInfo;
}

export const roomInfoStore = createStore<RoomInfoState & { actions: RoomInfoActions }>()(
  persist(
    (set, get) => ({
      ...initialRoomInfo,
      actions: {
        set,
        get: () => {
          const { actions: _, ...state } = get();
          return state;
        },
        setRawValues: (rawValues: Partial<RoomInfo>) => {
          set({ ...objectMap(rawValues, ([key, value]) => [key, value.rawValue]) });
        },
        getRawValues: () => {
          const state = { ...get().actions.get() };
          return objectMap(state, ([key, value]) => [key, value.rawValue]) as RawValues;
        },
        getParsedValues: () => {
          const state = { ...get().actions.getRawValues() };
          return objectMap(state, ([key, value]) => [key, parseRoomInfo(key as keyof RoomInfo, value)]) as RoomInfo;
        },
        reset: () => set({ ...initialRoomInfo }),
      },
    }),
    {
      name: 'roomInfo',
      partialize: state => {
        const { actions: _, ...roomInfo } = state;
        return { ...roomInfo };
      },
    },
  ),
);

export const roomInfoApiMapper = (values: RoomInfo | Nullable<RoomInfo>) => {
  const result = { ...values, structure: values.structure === '' ? undefined : '' };
  return mapObjUndefinedToNull(result) as Nullable<RoomInfo>;
};

export default roomInfoStore;
