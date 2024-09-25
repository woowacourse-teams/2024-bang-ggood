import AirConditionerFilled from '@/assets/icons/option/airconditioner-filled.svg';
import AirConditionerUnfilled from '@/assets/icons/option/airconditioner-unfilled.svg';
import BedFilled from '@/assets/icons/option/bed-filled.svg';
import BedUnfilled from '@/assets/icons/option/bed-unfilled.svg';
import ClosetFilled from '@/assets/icons/option/closet-filled.svg';
import ClosetUnfilled from '@/assets/icons/option/closet-unfilled.svg';
import DeskFilled from '@/assets/icons/option/desk-filled.svg';
import DeskUnfilled from '@/assets/icons/option/desk-unfilled.svg';
import ElectronicStoveFilled from '@/assets/icons/option/electronic-stove-filled.svg';
import ElectronicStoveUnfilled from '@/assets/icons/option/electronic-stove-unfilled.svg';
import ElevatorFilled from '@/assets/icons/option/elevator-filled.svg';
import ElevatorUnfilled from '@/assets/icons/option/elevator-unfilled.svg';
import MicrowaveFilled from '@/assets/icons/option/microwave-filled.svg';
import MicrowaveUnfilled from '@/assets/icons/option/microwave-unfilled.svg';
import RefrigeratorFilled from '@/assets/icons/option/refrigerator-filled.svg';
import RefrigeratorUnfilled from '@/assets/icons/option/refrigerator-unfilled.svg';
import ShoesRackFilled from '@/assets/icons/option/shoesrack-filled.svg';
import ShoesRackUnfilled from '@/assets/icons/option/shoesrack-unfilled.svg';
import SinkFilled from '@/assets/icons/option/sink-filled.svg';
import SinkUnfilled from '@/assets/icons/option/sink-unfilled.svg';
import WashingMachineFilled from '@/assets/icons/option/washingmachine-filled.svg';
import WashingMachineUnfilled from '@/assets/icons/option/washingmachine-unfilled.svg';
import { OptionWithIcon } from '@/types/option';

const OPTIONS: OptionWithIcon[] = [
  {
    id: 1,
    name: 'refrigerator',
    UnFilledIcon: RefrigeratorUnfilled,
    FilledIcon: RefrigeratorFilled,
    displayName: '냉장고',
  },
  {
    id: 2,
    name: 'sink',
    UnFilledIcon: SinkUnfilled,
    FilledIcon: SinkFilled,
    displayName: '싱크대',
  },
  {
    id: 3,
    name: 'electronicStove',
    UnFilledIcon: ElectronicStoveUnfilled,
    FilledIcon: ElectronicStoveFilled,
    displayName: '인덕션',
  },
  {
    id: 4,
    name: 'microwaveOven',
    UnFilledIcon: MicrowaveUnfilled,
    FilledIcon: MicrowaveFilled,
    displayName: '전자레인지',
  },
  {
    id: 5,
    name: 'airConditioner',
    UnFilledIcon: AirConditionerUnfilled,
    FilledIcon: AirConditionerFilled,
    displayName: '에어컨',
  },
  {
    id: 6,
    name: 'washingMachine',
    UnFilledIcon: WashingMachineUnfilled,
    FilledIcon: WashingMachineFilled,
    displayName: '세탁기',
  },
  {
    id: 7,
    name: 'closet',
    UnFilledIcon: ClosetUnfilled,
    FilledIcon: ClosetFilled,
    displayName: '옷장',
  },
  {
    id: 8,
    name: 'desk',
    UnFilledIcon: DeskUnfilled,
    FilledIcon: DeskFilled,
    displayName: '책상',
  },

  {
    id: 9,
    name: 'bed',
    UnFilledIcon: BedUnfilled,
    FilledIcon: BedFilled,
    displayName: '침대',
  },
  {
    id: 10,
    name: 'shoeRack',
    UnFilledIcon: ShoesRackUnfilled,
    FilledIcon: ShoesRackFilled,
    displayName: '신발장',
  },
  {
    id: 11,
    name: 'elevator',
    UnFilledIcon: ElevatorUnfilled,
    FilledIcon: ElevatorFilled,
    displayName: '엘리베이터',
  },
];

const OPTION_COUNT = OPTIONS.length;

const DEFAULT_OPTIONS: number[] = [];

export { DEFAULT_OPTIONS, OPTION_COUNT, OPTIONS };
