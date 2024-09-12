import createFormStore from '@/store/createFormStore';
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

export const initialRoomInfo = {
  roomName: '',
  deposit: '',
  rent: '',
  maintenanceFee: '',
  station: '',
  address: '',
  walkingTime: '',
  size: '',
  floor: '',
  floorLevel: '지상',
  type: '',
  structure: '',
  contractTerm: '',
  realEstate: '',
  occupancyMonth: '',
  occupancyPeriod: '초',
  summary: '',
  memo: '',
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
  includedMaintenances: '',
} as const;

const validatorSet: Record<string, Validator[]> = {
  roomName: [lengthValidator(20)],
  address: [],
  deposit: [isNumericValidator, nonNegativeValidator],
  rent: [isNumericValidator, nonNegativeValidator],
  maintenanceFee: [isNumericValidator, nonNegativeValidator],
  includedMaintenances: [],
  contractTerm: [isNumericValidator, nonNegativeValidator],
  station: [],
  walkingTime: [],
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
};

const checklistRoomInfoStore = createFormStore<RoomInfo>(initialRoomInfo, validatorSet, roomInfoType, 'roomInfoForm');

export default checklistRoomInfoStore;
