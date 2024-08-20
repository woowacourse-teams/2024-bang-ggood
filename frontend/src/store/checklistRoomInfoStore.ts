import { createStore } from 'zustand';

import { InputChangeEvent } from '@/types/event';
import { RoomInfo } from '@/types/room';
import { AllString } from '@/utils/utilityTypes';
import { validation } from '@/utils/validation';
import {
  inRangeValidator,
  isIntegerValidator,
  isNumericValidator,
  lengthValidator,
  nonNegativeValidator,
  positiveValidator,
  Validator,
} from '@/utils/validators';

interface RoomInfoAction {
  onChange: (event: InputChangeEvent) => void;
  set: (name: keyof RoomInfo, value: string | undefined) => void;
  setAll: (state: Partial<RoomInfoState>) => void;
  resetAll: () => void;
  _reset: (name: keyof RoomInfo) => void;
  _update: (name: keyof AllString<RoomInfo>, value: string | undefined) => void;
  _updateErrorMsg: (field: keyof RoomInfo, value: string) => void;
  _updateAfterValidation: (field: keyof RoomInfo, value: string, validators: Validator[]) => void;
  _transform: (name: string, value: string) => void;
}

export const initialRoomInfo = {
  // TODO: UT 를 위한 기본 더미 이름
  roomName: '8월 14일 1번째 방',
  address: undefined,
  deposit: undefined,
  rent: undefined,
  maintenanceFee: undefined,
  station: undefined,
  walkingTime: undefined,
  size: undefined,
  floor: undefined,
  floorLevel: '지상',
  type: undefined,
  structure: undefined,
  contractTerm: undefined,
  realEstate: undefined,
  occupancyMonth: undefined,
  occupancyPeriod: '초',
  summary: undefined,
  memo: undefined,
} as const;

const roomInfoType = {
  roomName: 'string',
  address: 'string',
  station: 'string',
  deposit: 'number',
  rent: 'number',
  maintenanceFee: 'number',
  walkingTime: 'number',
  size: 'number',
  floor: 'number',
  floorLevel: 'string',
  type: 'string',
  structure: 'string',
  contractTerm: 'number',
  realEstate: 'string',
  occupancyMonth: 'number',
  occupancyPeriod: 'string',
  summary: 'string',
  memo: 'string',
  createdAt: 'string',
  includedUtilities: '',
} as const;

const validatorSet: Record<string, Validator[]> = {
  roomName: [lengthValidator(20)],
  address: [],
  deposit: [isNumericValidator, nonNegativeValidator],
  rent: [isNumericValidator, nonNegativeValidator],
  maintenanceFee: [isNumericValidator, nonNegativeValidator],
  includedUtilities: [],
  contractTerm: [isNumericValidator, nonNegativeValidator],
  station: [],
  walkingTime: [isIntegerValidator],
  type: [],
  size: [isNumericValidator],
  floor: [isIntegerValidator, positiveValidator],
  floorLevel: [],
  structure: [],
  realEstate: [],
  occupancyMonth: [isNumericValidator, positiveValidator, inRangeValidator(1, 12)],
  occupancyPeriod: [isNumericValidator, positiveValidator],
  summary: [],
  memo: [],
};

const initialErrorMessages = Object.fromEntries(Object.entries(initialRoomInfo).map(([key]) => [key, '']));

type RoomInfoState = { rawValue: AllString<RoomInfo> } & { value: RoomInfo } & { errorMessage: AllString<RoomInfo> };

const transform = (name: string, value: string) =>
  roomInfoType[name as keyof RoomInfo] === 'number' ? Number(value) : value;
const checklistRoomInfoStore = createStore<
  RoomInfoState & {
    actions: RoomInfoAction;
  }
>((set, get) => ({
  rawValue: initialRoomInfo,
  value: initialRoomInfo,
  errorMessage: initialErrorMessages,
  actions: {
    onChange: event => {
      get().actions.set(event.target.name as keyof RoomInfo, event.target.value);
    },
    set: (name, value) => {
      if (value === '') {
        get().actions._reset(name);
        return;
      }

      get().actions._updateAfterValidation(name, value ?? '', validatorSet[name]);
    },

    resetAll: () => set({ rawValue: initialRoomInfo, value: initialRoomInfo, errorMessage: initialErrorMessages }),
    setAll: set,
    _reset: name => {
      get().actions._updateErrorMsg(name, '');
      get().actions._update(name, '');
    },
    _update: (name, value) => {
      set({ rawValue: { ...get().rawValue, [name]: value } });
      get().actions._transform(name, value ?? '');
    },
    _updateErrorMsg: (name, value) => set({ errorMessage: { ...get().errorMessage, [name]: value } }),
    _updateAfterValidation: (name, value, validators) => {
      validation(
        name,
        value,
        validators,
        (name: string, value: string) => {
          get().actions._update(name as keyof AllString<RoomInfo>, value);
        },
        (name: string, errorMessage: string) => {
          get().actions._updateErrorMsg(name as keyof RoomInfo, errorMessage);
        },
      );
    },
    _transform: (name, value) => set({ value: { ...get().value, [name]: transform(name, value) } }),
  },
}));

export default checklistRoomInfoStore;
