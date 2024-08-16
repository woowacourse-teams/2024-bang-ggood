import { createStore } from 'zustand';

import { InputChangeEvent } from '@/types/event';
import { RoomInfo } from '@/types/room';
import { AllString } from '@/utils/utilityTypes';
import {
  isIntegerValidator,
  isNumericValidator,
  lengthValidator,
  nonNegativeValidator,
  positiveValidator,
  Validator,
} from '@/utils/validators';

interface RoomInfoAction {
  reset: () => void;
  set: (name: keyof typeof validatorSet, value: string | undefined) => void;
  _update: (field: keyof AllString<RoomInfo> | keyof AllString<RoomInfo>, value: string | undefined) => void;
  _updateErrorMsg: (field: keyof RoomInfo, value: string) => void;
  _updateAfterValidation: (field: keyof RoomInfo, value: string, validators: Validator[]) => void;
  _transform: (name: string, value: string) => void;
  onChange: (event: InputChangeEvent) => void;
}

export const initialRoomInfo = {
  // TODO: UT 를 위한 기본 더미 이름
  roomName: '8월 14일 1번째 방',
  address: undefined,
  station: undefined,
  deposit: undefined,
  rent: undefined,
  fee: undefined,
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
  fee: 'number',
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
} as const;

const validatorSet: Record<string, Validator[]> = {
  roomName: [lengthValidator(20)],
  address: [],
  deposit: [isNumericValidator, nonNegativeValidator],
  rent: [isNumericValidator, nonNegativeValidator],
  fee: [isNumericValidator, nonNegativeValidator],
  contractTerm: [isNumericValidator, nonNegativeValidator],
  station: [],
  walkingTime: [isIntegerValidator],
  type: [],
  size: [isNumericValidator],
  floor: [isIntegerValidator, positiveValidator],
  floorLevel: [],
  structure: [],
  realEstate: [],
  occupancyMonth: [],
  occupancyPeriod: [],
  summary: [],
  memo: [],
};

const initialErrorMessages = Object.fromEntries(Object.entries(initialRoomInfo).map(([key]) => [key, '']));

type RoomInfoStore = { rawValue: AllString<RoomInfo> } & { value: RoomInfo } & { errorMessage: AllString<RoomInfo> } & {
  actions: RoomInfoAction;
};

const transform = (name: string, value: string) =>
  roomInfoType[name as keyof RoomInfo] === 'number' ? Number(value) : value;
const checklistRoomInfoStore = createStore<RoomInfoStore>((set, get) => ({
  rawValue: initialRoomInfo,
  value: initialRoomInfo,
  errorMessage: initialErrorMessages,
  actions: {
    set: (name, value) => {
      // 다 지우기할 시 다 지워주고, 에러메시지도 지우기
      if (value === '') {
        get().actions._updateErrorMsg(name as keyof RoomInfo, '');
        get().actions._update(name as keyof RoomInfo, '');
        return;
      }

      get().actions._updateAfterValidation(name as keyof RoomInfo, value ?? '', validatorSet[name]);
    },

    onChange: (event: InputChangeEvent) => {
      get().actions.set(event.target.name as keyof RoomInfo, event.target.value);
    },

    reset: () => set({ rawValue: initialRoomInfo, value: initialRoomInfo, errorMessage: initialErrorMessages }),
    _update: (name, value) => set({ rawValue: { ...get().rawValue, [name]: value } }),
    _updateErrorMsg: (name, value) => set({ errorMessage: { ...get().errorMessage, [name]: value } }),
    _updateAfterValidation: (name, value, validators) => {
      // 에러 검증
      const newErrorMessage = validators
        .slice()
        .reverse()
        .reduce((acc, { validate, errorMessage }) => (!validate(value) ? errorMessage : acc), '');

      // 에러메시지 업데이트
      get().actions._updateErrorMsg(name, newErrorMessage);

      // 검증 통과시 입력
      if (newErrorMessage.length === 0) {
        get().actions._update(name, value);
        get().actions._transform(name, value);
      }
    },
    _transform: (name, value) => set({ value: { ...get().value, [name]: transform(name, value) } }),
  },
}));

export default checklistRoomInfoStore;
