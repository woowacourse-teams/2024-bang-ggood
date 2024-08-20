import createFormStore from '@/store/createFormStore';
import {
  inRangeValidator,
  isIntegerValidator,
  isNumericValidator,
  lengthValidator,
  nonNegativeValidator,
  positiveValidator,
  Validator,
} from '@/utils/validators';

export const initialRoomInfo = {
  roomName: '8월 14일 1번째 방', // TODO: N번째방 구현하기
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

const checklistRoomInfoStore = createFormStore(initialRoomInfo, validatorSet, roomInfoType);

export default checklistRoomInfoStore;
