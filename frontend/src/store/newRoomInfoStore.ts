import { createStore, useStore } from 'zustand';

import { roomFloorLevels, roomOccupancyPeriods } from '@/constants/roomInfo';
import { RoomInfo0 } from '@/types/room';
import { AllString } from '@/utils/utilityTypes';
import {
  inRangeValidator,
  isIntegerValidator,
  isNumericValidator,
  lengthValidator,
  nonNegativeValidator,
  positiveValidator,
  Validator,
} from '@/utils/validators';

export const newRoomInfoStore = createStore<
  AllString<RoomInfo0> & { actions: { set: (o: Partial<AllString<RoomInfo0>>) => void; get: () => void } }
>()((set, get, reset) => ({
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
  //
  buildingName: '',
  station: '',
  walkingTime: '',
  address: '',
  includedMaintenances: '',

  actions: {
    set,
    get,
    reset,
  },
}));

const isNumeric = new Set<keyof RoomInfo0>(['roomName']);

const validators: Record<keyof RoomInfo0, Validator[]> = {
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

  occupancyPeriod: [],
  summary: [],
  memo: [],

  station: [],
  walkingTime: [],
  address: [],
  createdAt: [],
  buildingName: [],
  includedMaintenances: [],
};

const validation = (rawValue: string, validators: Validator[]) => {
  const newErrorMessage =
    validators
      .slice() //validatiors 가 런타임 때 undefined 일 경우를 대비해 ? 로 처리
      .reverse()
      .reduce((acc, { validate, errorMessage }) => (!validate(rawValue) ? errorMessage : acc), '') ?? '';

  return newErrorMessage;
};

const useValidatedStore = (name: keyof RoomInfo0) => {
  const rawValue = useStore(newRoomInfoStore, state => state[name])!;
  const actions = useStore(newRoomInfoStore, state => state.actions);

  const set = (rawValue: string) => actions.set({ [name]: rawValue });
  const value = isNumeric.has(name) ? Number(rawValue) : rawValue;
  const errorMessage = validation(rawValue, validators[name]);
  if (!errorMessage) actions.set({ [name]: isNumeric.has(name) ? Number(rawValue) : rawValue });

  return { rawValue, value, errorMessage, set };
};
