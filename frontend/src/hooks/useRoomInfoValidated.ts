import { useCallback } from 'react';
import { useStore } from 'zustand';

import roomInfoStore from '@/store/roomInfoStore';
import { InputChangeEvent } from '@/types/event';
import { RoomInfo } from '@/types/room';
import {
  inRangeValidator,
  isIntegerValidator,
  isNumericValidator,
  lengthValidator,
  nonNegativeValidator,
  positiveValidator,
  Validator,
} from '@/utils/validators';

const validators: Record<keyof ValidatedRoomInfo, Validator[]> = {
  roomName: [lengthValidator(20)],
  deposit: [isNumericValidator, nonNegativeValidator],
  rent: [isNumericValidator, nonNegativeValidator],
  maintenanceFee: [isNumericValidator, nonNegativeValidator],
  contractTerm: [isNumericValidator, nonNegativeValidator, inRangeValidator(0, 10000)],
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
  buildingName: [],
};

const numerics = [
  'deposit',
  'rent',
  'maintenanceFee',
  'contractTerm',
  'size',
  'floor',
  'occupancyMonth',
  'occupancyPeriod',
  'walkingTime',
] as const satisfies (keyof ValidatedRoomInfo)[];

const isNumeric = new Set<keyof RoomInfo>(numerics);

type ValidatedRoomInfo = Omit<RoomInfo, 'includedMaintenances' | 'createdAt' | 'geolocation'>;
type Includes<T extends readonly string[], U extends string> = U extends T[number] ? true : false;

export const parseRoomInfo = (name: keyof RoomInfo, rawValue: string) =>
  (isNumeric.has(name) ? Number(rawValue) : rawValue) as Includes<typeof numerics, typeof name> extends true
    ? number
    : string;

const useRoomInfoValidated = <Key extends keyof ValidatedRoomInfo>(name: Key) => {
  const rawValue = useStore(roomInfoStore, state => state[name])!.rawValue!;
  const errorMessage = useStore(roomInfoStore, state => state[name])!.errorMessage!;
  const actions = useStore(roomInfoStore, state => state.actions);
  const value = parseRoomInfo(name, rawValue);

  const set = useCallback(
    (rawValue: string) => actions.set({ [name]: { rawValue, errorMessage } }),
    [name, errorMessage, actions],
  );

  // 에러메시지가 없을 경우만 set
  const onChange = useCallback(
    (e: InputChangeEvent) => {
      if (e.target.value === '') {
        actions.set({ [name]: { rawValue: '', errorMessage: '' } });
        return;
      }

      const errorMessage = validation(e.target.value, validators[name]);
      if (errorMessage) {
        actions.set({ [name]: { rawValue, errorMessage } });
        return;
      }
      actions.set({ [name]: { rawValue: e.target.value, errorMessage } });
    },
    [name, rawValue, actions],
  );

  return { rawValue, value, errorMessage, onChange, set };
};

const validation = (rawValue: string, validators: Validator[] | undefined) => {
  const newErrorMessage =
    validators
      ?.slice()
      .reverse()
      .reduce((acc, { validate, errorMessage }) => (!validate(rawValue) ? errorMessage : acc), '') ?? '';

  return newErrorMessage;
};

export default useRoomInfoValidated;
