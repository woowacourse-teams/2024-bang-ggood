import { createStore } from 'zustand';

import { InputChangeEvent } from '@/components/_common/Input/Input';
import { RoomInfo } from '@/types/room';
import { isNumericValidator, lengthValidator, nonNegativeValidator, Validator } from '@/utils/validators';

interface RoomInfoAction {
  reset: () => void;
  set: (name: keyof typeof validatorSet, value: string | number | undefined) => void;
  _update: (field: keyof RoomInfo | keyof PrefixWithE<RoomInfo>, value: string | number | undefined) => void;
  _updateErrorMsg: (field: keyof RoomInfo, value: string) => void;
  _updateAfterValidation: <T extends number | string>(
    field: keyof RoomInfo,
    value: T,
    validators: Validator<T>[],
  ) => void;
  onChange: (event: InputChangeEvent) => void;
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
  [K in keyof T as `E_${string & K}`]: string;
};

const checklistRoomInfoStore = createStore<
  { roomInfo: RoomInfo } & { error: PrefixWithE<RoomInfo> } & { actions: RoomInfoAction }
>((set, get) => ({
  roomInfo: { ...initialRoomInfo },
  error: { ...initialErrorMessages },
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
    reset: () => set({ roomInfo: { ...initialRoomInfo }, error: { ...initialErrorMessages } }),
    _update: (name, value) => set({ roomInfo: { ...get().roomInfo, [name]: value } }),
    _updateErrorMsg: (name, value) => set({ error: { ...get().error, [`E_${name}`]: value } }),
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
