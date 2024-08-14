import { createStore } from 'zustand';

import { InputChangeEvent } from '@/types/event';
import { RoomInfo } from '@/types/room';
import { isNumericValidator, lengthValidator, nonNegativeValidator, Validator } from '@/utils/validators';

interface RoomInfoAction {
  reset: () => void;
  set: (name: keyof typeof validatorSet, value: string | number | undefined) => void;
  _update: (field: keyof RoomInfo | keyof StringValue<RoomInfo>, value: string | number | undefined) => void;
  _updateErrorMsg: (field: keyof RoomInfo, value: string) => void;
  _updateAfterValidation: <T extends number | string>(
    field: keyof RoomInfo,
    value: T,
    validators: Validator<T>[],
  ) => void;
  onChange: (event: InputChangeEvent) => void;
}

export const initialRoomInfo: RoomInfo = {
  // TODO: UT 를 위한 기본 더미 이름
  roomName: '8월 14일 1번째 방',
  address: undefined,
  station: undefined,
  deposit: undefined,
  rent: undefined,
  walkingTime: undefined,
  size: undefined,
  floor: undefined,
  floorLevel: '지상',
  type: undefined,
  structure: undefined,
  contractTerm: undefined,
  realEstate: undefined,
  summary: undefined,
  memo: undefined,
} as const;

const validatorSet = {
  roomName: [lengthValidator(20)],
  address: [],
  deposit: [isNumericValidator, nonNegativeValidator],
  rent: [isNumericValidator, nonNegativeValidator],
  contractTerm: [isNumericValidator, nonNegativeValidator],
  station: [],
  walkingTime: [isNumericValidator],
  type: [],
  size: [isNumericValidator],
  floor: [isNumericValidator],
  floorLevel: [],
  structure: [],
  realEstate: [],
  summary: [],
  memo: [],
} satisfies Record<string, Validator<string>[] | Validator<number>[]>;

const initialErrorMessages = Object.fromEntries(Object.entries(initialRoomInfo).map(([key]) => [key, '']));

type StringValue<T> = {
  [K in keyof T]: string;
};

const checklistRoomInfoStore = createStore<
  { roomInfo: RoomInfo } & { errorMessage: StringValue<RoomInfo> } & { actions: RoomInfoAction }
>((set, get) => ({
  roomInfo: { ...initialRoomInfo },
  errorMessage: { ...initialErrorMessages },
  actions: {
    set: (name, value) => {
      if (typeof value === 'string') {
        get().actions._updateAfterValidation(name, value, validatorSet[name] as Validator<string>[]);
      } else if (typeof value === 'number') {
        get().actions._updateAfterValidation(name, value, validatorSet[name] as Validator<number>[]);
      }
    },

    onChange: (event: InputChangeEvent) => {
      if (event.target.value === '') {
        get().actions._updateErrorMsg(event.target.name as keyof RoomInfo, '');
        get().actions._update(event.target.name as keyof RoomInfo, '');
        return;
      }

      get().actions.set(
        event.target.name as keyof RoomInfo,
        event.target?.type === 'number' ? parseInt(event.target.value) : event.target.value,
      );
    },

    reset: () => set({ roomInfo: { ...initialRoomInfo }, errorMessage: { ...initialErrorMessages } }),

    _update: (name, value) => set({ roomInfo: { ...get().roomInfo, [name]: value } }),
    _updateErrorMsg: (name, value) => set({ errorMessage: { ...get().errorMessage, [name]: value } }),
    _updateAfterValidation: (name, value, validators) => {
      const newErrorMessage = validators.reduce(
        (acc, { validate, errorMessage }) => (!validate(value) ? errorMessage : acc),
        '',
      );

      get().actions._updateErrorMsg(name, newErrorMessage);

      if (newErrorMessage.length === 0) {
        get().actions._update(name, value);
      }
    },
  },
}));

export default checklistRoomInfoStore;
