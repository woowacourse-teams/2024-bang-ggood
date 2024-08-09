import { createStore } from 'zustand';

import { RoomInfo } from '@/types/room';

interface RoomInfoAction {
  update: (field: keyof RoomInfo | keyof PrefixWithE<RoomInfo>, value: string | number) => void;
  updateErrMsg: (field: keyof RoomInfo, value: string) => void;
  reset: () => void;
  validation: <T extends number | string>(field: keyof RoomInfo, value: T, validators: Validator<T>[]) => void;
  setRoomName: (newName: string) => void;
  setAddress: (address: string) => void;
  setDeposit: (deposit: number) => void;
  setRent: (rent: number) => void;
  setContractTerm: (term: number) => void;
  setFloor: (floor: number) => void;
  setStation: (station: string) => void;
  setWalkingTime: (time: number) => void;
  setRealEstate: (realEstate: string) => void;
  setType: (type: string) => void;
  setSize: (size: number) => void;
  setFloorLevel: (floorLevel: string) => void;
  setStructure: (structure: string) => void;
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
  validate: (value: string) => value.length <= length,
  errorMessage: `길이는 ${length}자를 초과할 수 없습니다.`,
});
const positiveValidator = { validate: (value: number) => value > 0, errorMessage: '양수여야 합니다.' };

const validatorSet: Record<string, Validator<string>[]> = {
  roomName: [lengthValidator(20)],
  address: [],
  deposit: [],
  rent: [],
  contractTerm: [],
  station: [],
  walkingTime: [],
  realEstate: [],
  type: [],
  size: [],
  floor: [],
  floorLevel: [],
  structure: [],
};

type PrefixWithE<T> = {
  [K in keyof T as `E_${string & K}`]: T[K];
};

const checklistRoomInfoStore = createStore<RoomInfo & PrefixWithE<RoomInfo> & { actions: RoomInfoAction }>(
  (set, get) => ({
    ...initialRoomInfo,
    ...initialErrorMessages,
    actions: {
      update: (field, value) => set({ [field]: value }),
      updateErrMsg: (field, value) => set({ [`E_${field}`]: value }),
      reset: () => set({ ...initialRoomInfo, ...initialErrorMessages }),
      validation: (field, value, validators) => {
        const newErrorMessage = validators.reduce(
          (acc, { validate, errorMessage }) => (acc.length === 0 && !validate(value) ? errorMessage : acc),
          '',
        );

        if (newErrorMessage.length > 0) {
          get().actions.updateErrMsg(field, newErrorMessage);
          return;
        }
        get().actions.update(field, value);
      },

      setRoomName: newName => get().actions.validation('roomName', newName, validatorSet.roomName),
      setAddress: address => {},
      setDeposit: deposit => {},
      setRent: rent => {},
      setContractTerm: term => {},
      setFloor: floor => {},
      setStation: station => {},
      setWalkingTime: time => {},
      setRealEstate: realEstate => {},
      setType: type => {},
      setSize: size => {},
      setFloorLevel: floorLevel => {},
      setStructure: structure => {},
    },
  }),
);

export default checklistRoomInfoStore;
