import { roomFloorLevels, roomOccupancyPeriods } from '@/constants/roomInfo';
import { createInputFieldStores, FormSpec } from '@/store/createFormFieldSlice';
import { RoomInfo } from '@/types/room';
import {
  inRangeValidator,
  isIntegerValidator,
  isNumericValidator,
  lengthValidator,
  nonNegativeValidator,
  positiveValidator,
} from '@/utils/validators';

export const roomFormSpec: FormSpec<Omit<RoomInfo, 'includedMaintenances'>> = {
  roomName: { initialValue: '', type: 'string', validators: [lengthValidator(20)] },
  deposit: { initialValue: '', type: 'number', validators: [isNumericValidator, nonNegativeValidator] },
  rent: { initialValue: '', type: 'number', validators: [isNumericValidator, nonNegativeValidator] },
  maintenanceFee: { initialValue: '', type: 'number', validators: [isNumericValidator, nonNegativeValidator] },
  contractTerm: { initialValue: '', type: 'number', validators: [isNumericValidator, nonNegativeValidator] },
  type: { initialValue: '', type: 'string', validators: [] },
  size: { initialValue: '', type: 'number', validators: [isNumericValidator] },
  floor: { initialValue: '', type: 'number', validators: [isIntegerValidator, positiveValidator] },
  floorLevel: { initialValue: roomFloorLevels[0], type: 'string', validators: [] },
  structure: { initialValue: 'NONE', type: 'string', validators: [] },
  realEstate: { initialValue: '', type: 'string', validators: [] },
  occupancyMonth: {
    initialValue: `${new Date().getMonth() + 1}`,
    type: 'number',
    validators: [isIntegerValidator, positiveValidator, inRangeValidator(1, 12)],
  },
  occupancyPeriod: { initialValue: roomOccupancyPeriods[0], type: 'string', validators: [] },
  summary: { initialValue: '', type: 'string', validators: [] },
  memo: { initialValue: '', type: 'string', validators: [] },
  // includedMaintenances: { initialValue: '', type: 'number[]', validators: [] },
};

export const checklistRoomInfostores = createInputFieldStores(roomFormSpec);
