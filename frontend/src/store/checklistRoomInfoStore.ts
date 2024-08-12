import { createStore } from 'zustand';

import { RoomInfo } from '@/types/room';

interface RoomInfoAction {
  update: (field: keyof RoomInfo | keyof PrefixWithE<RoomInfo>, value: string | number) => void;
  updateErrorMsg: (field: keyof RoomInfo, value: string) => void;
  reset: () => void;
  validation: <T extends number | string>(field: keyof RoomInfo, value: T, validators: Validator<T>[]) => void;
  set: (name: keyof typeof validatorSet, value: string | number) => void;
}

export const initialRoomInfo: RoomInfo = {
  roomName: undefined,
  address: undefined,
  deposit: undefined,
  rent: undefined,
  contractTerm: undefined,
  floor: undefined,
  station: undefined,
  walkingTime: undefined,
  realEstate: undefined,
  type: undefined,
  size: undefined,
  floorLevel: undefined,
  structure: undefined,
} as const;

const initialErrorMessages = Object.fromEntries(Object.entries(initialRoomInfo).map(([key]) => ['E_' + key, '']));

interface Validator<T> {
  validate: (value: T) => boolean;
  errorMessage: string;
}

const lengthValidator = (length: number): Validator<string> => ({
  validate: value => value.length <= length,
  errorMessage: `${length}자 이하로 입력해주세요.`,
});
const inRangeValidator = (from: number, to: number): Validator<number> => ({
  validate: value => from <= value && value <= to,
  errorMessage: `${from}이상 ${to}이하의 숫자만 입력해주세요.`,
});

const positiveValidator: Validator<number> = { validate: value => value > 0, errorMessage: '양수만 입력해주세요.' };
const isNumericValidator: Validator<number> = {
  validate: value => !isNaN(value),
  errorMessage: '숫자만 입력해주세요.',
};

const validatorSet = {
  roomName: [lengthValidator(20)],
  address: [],
  deposit: [isNumericValidator],
  rent: [isNumericValidator],
  contractTerm: [isNumericValidator],
  station: [],
  walkingTime: [isNumericValidator],
  realEstate: [],
  type: [],
  size: [isNumericValidator],
  floor: [isNumericValidator],
  floorLevel: [],
  structure: [],
} satisfies Record<string, Validator<string>[] | Validator<number>[]>;

type PrefixWithE<T> = {
  [K in keyof T as `E_${string & K}`]: T[K];
};

const checklistRoomInfoStore = createStore<RoomInfo & PrefixWithE<RoomInfo> & { actions: RoomInfoAction }>(
  (set, get) => ({
    ...initialRoomInfo,
    ...initialErrorMessages,
    actions: {
      update: (field, value) => set({ [field]: value }),
      updateErrorMsg: (field, value) => set({ [`E_${field}`]: value }),
      reset: () => set({ ...initialRoomInfo, ...initialErrorMessages }),
      validation: (field, value, validators) => {
        const newErrorMessage = validators.reduce(
          (acc, { validate, errorMessage }) => (acc.length === 0 && !validate(value) ? errorMessage : acc),
          '',
        );

        if (newErrorMessage.length > 0) {
          get().actions.updateErrorMsg(field, newErrorMessage);
          return;
        }
        get().actions.update(field, value);
      },
      set: (name: keyof typeof validatorSet, value: string | number) => {
        if (typeof value === 'string') {
          get().actions.validation(name, value, validatorSet[name] as Validator<string>[]);
        } else if (typeof value === 'number') {
          get().actions.validation(name, value, validatorSet[name] as Validator<number>[]);
        }
      },
    },
  }),
);

export default checklistRoomInfoStore;
