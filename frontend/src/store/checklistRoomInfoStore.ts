import { createStore } from 'zustand';

import { RoomInfo } from '@/types/room';
import { isNumericValidator, lengthValidator, nonNegativeValidator, Validator } from '@/utils/validators';

interface RoomInfoAction {
  reset: () => void;
  set: (name: keyof typeof validatorSet, value: string | number) => void;
  _update: (field: keyof RoomInfo | keyof PrefixWithE<RoomInfo>, value: string | number) => void;
  _updateErrorMsg: (field: keyof RoomInfo, value: string) => void;
  _updateAfterValidation: <T extends number | string>(
    field: keyof RoomInfo,
    value: T,
    validators: Validator<T>[],
  ) => void;
}

export const initialRoomInfo: RoomInfo = {
  roomName: undefined,
  address: undefined,
  station: undefined,
  deposit: undefined,
  rent: undefined,
  walkingTime: undefined,
  size: undefined,
  floor: undefined,
  floorLevel: undefined,
  type: undefined,
  structure: undefined,
  contractTerm: undefined,
  realEstate: undefined,
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
} satisfies Record<string, Validator<string>[] | Validator<number>[]>;

const initialErrorMessages = Object.fromEntries(Object.entries(initialRoomInfo).map(([key]) => ['E_' + key, '']));

type PrefixWithE<T> = {
  [K in keyof T as `E_${string & K}`]: T[K];
};

const checklistRoomInfoStore = createStore<RoomInfo & PrefixWithE<RoomInfo> & { actions: RoomInfoAction }>(
  (set, get) => ({
    ...initialRoomInfo,
    ...initialErrorMessages,
    actions: {
      set: (name: keyof typeof validatorSet, value: string | number) => {
        if (typeof value === 'string') {
          get().actions._updateAfterValidation(name, value, validatorSet[name] as Validator<string>[]);
        } else if (typeof value === 'number') {
          get().actions._updateAfterValidation(name, value, validatorSet[name] as Validator<number>[]);
        }
      },
      reset: () => set({ ...initialRoomInfo, ...initialErrorMessages }),
      _update: (name, value) => set({ [name]: value }),
      _updateErrorMsg: (name, value) => set({ [`E_${name}`]: value }),
      _updateAfterValidation: (name, value, validators) => {
        const newErrorMessage = validators.reduce(
          (acc, { validate, errorMessage }) => (acc.length === 0 && !validate(value) ? errorMessage : acc),
          '',
        );

        if (newErrorMessage.length > 0) {
          get().actions._updateErrorMsg(name, newErrorMessage);
          return;
        }
        get().actions._update(name, value);
      },
    },
  }),
);

export default checklistRoomInfoStore;
