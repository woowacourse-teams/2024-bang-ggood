import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

import { roomFloorLevels, roomOccupancyPeriods } from '@/constants/roomInfo';
import { parseRoomInfo } from '@/hooks/useRoomInfoValidated';
import { RoomInfo } from '@/types/room';
import { Nullable } from '@/utils/utilityTypes';

import { mapObjUndefinedToNull, objectMap } from '../utils/typeFunctions';

type NumberToString<T> = T extends number | string ? string : T;

type RoomInfoStoreState = Required<Omit<RoomInfo, 'createdAt'>>;

/** roomInfo 자료를 모두 담는 스토어입니다.
 * rawValues: roomInfo 백엔드 스키마에 해당하는 자료를 모두 담을 수 있습니다. (다만 number 타입자료형만은 string으로 저장하고있습니다.)
 * errorMessage: 기본값은 ''(에러없음) 입니다.
 *
 * 현재 구현상으로는 폼과 무관해서 안쓰더라도 errorMessage를 만들어줘야합니다.
 */
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
export type RawValues = { [k in keyof RoomInfoStoreState]: NumberToString<RoomInfoStoreState[k]> };
export type RoomInfoState = {
  [k in keyof RoomInfoStoreState]: { rawValue: NumberToString<RoomInfoStoreState[k]>; errorMessage: string };
};

interface RoomInfoActions {
  set: (o: Partial<RoomInfoState>) => void;
  get: () => RoomInfoState;
  reset: () => void;
  setRawValues: (rawValues: Partial<RoomInfo>) => void;
  getRawValues: () => RawValues;
  getParsedValues: () => RoomInfo;
}

/**
 * getParsedValues: store에 저장된 걸 백엔드에 POST하는 등 데이터가 필요할때 사용합니다.
 * getRawValues: errorMessages말고 rawValues들만을 담은 객체를 반환합니다.
 */
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
          set({ ...objectMap(rawValues, ([key, value]) => [key, { rawValue: value, errorMessage: '' }]) });
        },
        getRawValues: () => {
          const state = { ...get().actions.get() };
          return objectMap(state, ([key, value]) => [key, value.rawValue]) as RawValues;
        },
        getParsedValues: () => {
          const state = { ...get().actions.getRawValues() };
          return objectMap(state, ([key, value]) => [
            key,
            typeof value === 'string' ? parseRoomInfo(key as keyof RoomInfo, value) : value,
          ]) as RoomInfo;
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

export const roomInfoApiMapper = (values: Partial<RoomInfoStoreState>) => {
  console.log('mapper', values);

  const result = {
    ...values,
    structure: values.structure === '' ? undefined : values.structure,

    rent: values.rent === 0 ? undefined : values.rent,

    deposit: values.deposit === 0 ? undefined : values.deposit,
    maintenanceFee: values.maintenanceFee === 0 ? undefined : values.maintenanceFee,
    floor: values.floor === 0 ? undefined : values.floor,
    size: values.size === 0 ? undefined : values.size,
    contractTerm: values.contractTerm === 0 ? undefined : values.contractTerm,
    occupancyMonth: values.occupancyMonth === 0 ? undefined : values.occupancyMonth,
  };

  return mapObjUndefinedToNull(result) as Nullable<Partial<RoomInfoStoreState>>;
};

export default roomInfoStore;
