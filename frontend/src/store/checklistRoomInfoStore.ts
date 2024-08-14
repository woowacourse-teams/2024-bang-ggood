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
  _updateAfterValidation: (field: keyof RoomInfo, value: string, validators: Validator<string>[]) => void;
  onChange: (event: InputChangeEvent) => void;
}

export const initialRoomInfo: AllString<RoomInfo> = {
  roomName: undefined,
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
  walkingTime: [isIntegerValidator],
  type: [],
  size: [isNumericValidator],
  floor: [isIntegerValidator, positiveValidator],
  floorLevel: [],
  structure: [],
  realEstate: [],
  summary: [],
  memo: [],
} satisfies Record<string, Validator<string>[]>;

const initialErrorMessages = Object.fromEntries(Object.entries(initialRoomInfo).map(([key]) => [key, '']));

const checklistRoomInfoStore = createStore<
  { roomInfo: AllString<RoomInfo> } & { errorMessage: AllString<RoomInfo> } & { actions: RoomInfoAction }
>((set, get) => ({
  roomInfo: { ...initialRoomInfo },
  errorMessage: { ...initialErrorMessages },
  actions: {
    set: (name, value) => {
      get().actions._updateAfterValidation(name, value ?? '', validatorSet[name] as Validator<string>[]);
    },

    onChange: (event: InputChangeEvent) => {
      if (event.target.value === '') {
        get().actions._updateErrorMsg(event.target.name as keyof RoomInfo, '');
        get().actions._update(event.target.name as keyof RoomInfo, '');
        return;
      }

      get().actions.set(event.target.name as keyof RoomInfo, event.target.value);
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
