import { roomFloorLevels, roomOccupancyPeriods } from '@/constants/roomInfo';
import createFormStore, { FormSpec } from '@/store/createFormStore';
import { RoomInfo } from '@/types/room';
import { objectMap } from '@/utils/typeFunctions';
import {
  inRangeValidator,
  isIntegerValidator,
  isNumericValidator,
  lengthValidator,
  nonNegativeValidator,
  positiveValidator,
} from '@/utils/validators';

const formSpec: FormSpec<RoomInfo> = {
  roomName: { initialValue: '', type: 'string', validators: [lengthValidator(20)] },
  // address: { initialValue: '', type: 'string', validators: [] },
  // station: { initialValue: '', type: 'string', validators: [] },
  // walkingTime: { initialValue: '', type: 'number', validators: [] },
  deposit: { initialValue: '', type: 'number', validators: [isNumericValidator, nonNegativeValidator] },
  rent: { initialValue: '', type: 'number', validators: [isNumericValidator, nonNegativeValidator] },
  maintenanceFee: { initialValue: '', type: 'number', validators: [isNumericValidator, nonNegativeValidator] },
  includedMaintenances: { initialValue: '', type: 'number[]', validators: [] },
  contractTerm: { initialValue: '', type: 'number', validators: [isNumericValidator, nonNegativeValidator] },
  type: { initialValue: '', type: 'string', validators: [] },
  size: { initialValue: '', type: 'number', validators: [isNumericValidator] },
  floor: { initialValue: '', type: 'number', validators: [isIntegerValidator, positiveValidator] },
  floorLevel: { initialValue: roomFloorLevels[0], type: 'string', validators: [] },
  structure: { initialValue: '', type: 'string', validators: [] },
  realEstate: { initialValue: '', type: 'string', validators: [] },
  occupancyMonth: {
    initialValue: '',
    type: 'number',
    validators: [isIntegerValidator, positiveValidator, inRangeValidator(1, 12)],
  },
  occupancyPeriod: { initialValue: roomOccupancyPeriods[0], type: 'string', validators: [] },
  summary: { initialValue: '', type: 'string', validators: [] },
  memo: { initialValue: '', type: 'string', validators: [] },
};

export const initialRoomInfo = objectMap(formSpec, ([key, val]) => [key, val.initialValue]);

const checklistRoomInfoStore = createFormStore<RoomInfo>(formSpec, 'roomInfoForm');

export default checklistRoomInfoStore;
