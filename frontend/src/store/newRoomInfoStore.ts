import { useCallback } from 'react';
import { createStore, useStore } from 'zustand';

import { roomFloorLevels, roomOccupancyPeriods } from '@/constants/roomInfo';
import { RoomInfo0 } from '@/types/room';
import {
  inRangeValidator,
  isIntegerValidator,
  isNumericValidator,
  lengthValidator,
  nonNegativeValidator,
  positiveValidator,
  Validator,
} from '@/utils/validators';

import { InputChangeEvent } from './../types/event';

type ValidatedRoomInfo = Omit<RoomInfo0, 'includedMaintenances' | 'occupancyPeriod'>;
type NumberToString<T> = { [k in keyof T]: T[k] extends number | string ? string : T[k] };
export const initialRoomInfo = {
  roomName: '',
  deposit: '',
  rent: '',
  maintenanceFee: '',
  contractTerm: '',
  type: '',
  size: '',
  floor: '',
  floorLevel: roomFloorLevels[0],
  structure: 'NONE',
  realEstate: '',
  occupancyMonth: `${new Date().getMonth() + 1}`,
  occupancyPeriod: roomOccupancyPeriods[0],
  summary: '',
  memo: '',

  buildingName: '',
  station: '',
  walkingTime: '',
  address: '',
  includedMaintenances: [],
};

export const newRoomInfoStore = createStore<
  NumberToString<RoomInfo0> & {
    actions: { set: (o: Partial<NumberToString<RoomInfo0>>) => void; get: () => void };
  }
>()((set, get, reset) => ({
  ...initialRoomInfo,
  actions: {
    set,
    get,
    reset,
  },
}));

const numerics = [
  'deposit',
  'rent',
  'maintenanceFee',
  'contractTerm',
  'size',
  'floor',
  'occupancyMonth',
  'walkingTime',
] as const satisfies (keyof ValidatedRoomInfo)[];
const isNumeric = new Set<keyof ValidatedRoomInfo>(numerics);

const validators: Record<keyof ValidatedRoomInfo, Validator[]> = {
  roomName: [lengthValidator(20)],
  deposit: [isNumericValidator, nonNegativeValidator],
  rent: [isNumericValidator, nonNegativeValidator],
  maintenanceFee: [isNumericValidator, nonNegativeValidator],
  contractTerm: [isNumericValidator, nonNegativeValidator],
  type: [],
  size: [isNumericValidator],
  floor: [isIntegerValidator, positiveValidator],
  floorLevel: [],
  structure: [],
  realEstate: [],
  occupancyMonth: [isIntegerValidator, positiveValidator, inRangeValidator(1, 12)],

  summary: [],
  memo: [],

  station: [],
  walkingTime: [],
  address: [],
  createdAt: [],
  buildingName: [],
};

const validation = (rawValue: string, validators: Validator[] | undefined) => {
  const newErrorMessage =
    validators
      ?.slice()
      .reverse()
      .reduce((acc, { validate, errorMessage }) => (!validate(rawValue) ? errorMessage : acc), '') ?? '';

  return newErrorMessage;
};

type Includes<T extends readonly string[], U extends string> = U extends T[number] ? true : false;
const useValidatedStore = <Key extends keyof ValidatedRoomInfo>(name: Key) => {
  const rawValue = useStore(newRoomInfoStore, state => state[name])!;
  const actions = useStore(newRoomInfoStore, state => state.actions);
  const value = (isNumeric.has(name) ? Number(rawValue) : rawValue) as Includes<
    typeof numerics,
    typeof name
  > extends true
    ? number
    : string;
  const errorMessage = validation(rawValue, validators[name]);

  const set = useCallback((rawValue: string) => actions.set({ [name]: rawValue }), [name, actions]);

  // 에러메시지가 없을 경우만 set
  const onChange = useCallback(
    (e: InputChangeEvent) => {
      if (errorMessage) return;
      set(e.target.value);
    },
    [set, errorMessage],
  );

  return { rawValue, value, errorMessage, onChange, set };
};

export default useValidatedStore;
